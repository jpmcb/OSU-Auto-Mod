/**
 * OSU - Auto Mod
 * Source Repo: https://github.com/jpmcb/OSU-Auto-Mod
 * @author - John McBride mcbridej@oregonstate.edu
 * @description - The OSU Auto Moderator apart of the OSU Online CS Slack community.
 * The purpose of this slack bot is to give several utilities to the Admins and
 * enable a more inclusive, open community. Please see the README.md in the Github repo.
 */

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const events = require('./events');

const app = express();

/*
 * parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h2>The Welcome/Terms of Service app is running</h2> <p>Follow the' +
  ' instructions in the README to configure the Slack App and your' +
  ' environment variables.</p>');
});

app.post('/', (req, res) => {
  switch (req.body.type) {
    case 'url_verification': {
      // verifies API endpoint 
      console.log(req.body);
      res.send({ challenge: req.body.challenge });
      break;
    }
  }
})

// Handles the emoji release POST from the /release-emojis slash command
app.post('/slash', (req, res) => {
  
  // Only admins in the admin channel can release emojis
  if(req.body.channel_id == process.env.ADMINS || req.body.channel_id == process.env.ADMINS_TEST){
    res.status(200).json({
      text: "Ok! I've released the current emoji meta to #emoji_meta"
    });
    events.releaseEmojis();
  } else {
    res.status(200).json({
      text: "Sorry! You aren't authorized to do that!"
    });
  }
});

/* ***************************
 * Endpoint to receive events from Slack's Events API.
 * Handles:
 *   - event_callback: Confirm verification token & handle `channel_created` event.
 * **************************/
app.post('/events', (req, res) => {
  switch (req.body.type) {
    case 'url_verification': {
      // verifies events API endpoint 
      res.send({ challenge: req.body.challenge });
      break;
    }
    case 'event_callback': {
      if ((process.env.ENV === 'PROD' && req.body.token === process.env.SLACK_VERIFICATION_TOKEN) ||
          (process.env.ENV === 'TEST' && req.body.token === process.env.SLACK_VERIFICATION_TOKEN_TEST)) {
        res.sendStatus(200);
        const event = req.body.event;
        switch(event.type){
          case 'channel_created': {
            events.newChannel(event.channel.name);
            break;
          } case 'team_join': {
            events.onboard(event.user.id);
            break;
          } case 'message': {
            if((event.user != process.env.AUTO_MOD && event.user != process.env.AUTO_MOD_TEST) && event.subtype != 'message_changed') {
              events.anonReport(event.text);
              events.anonResponse(event.user);
            }
            break;
          } case 'emoji_changed': {
            events.emoji(event);
            break;
          } default: { res.sendStatus(500); }
        } 
      } else { res.sendStatus(500); }
      break;
    }
    default: { res.sendStatus(500); }
  }
});


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
