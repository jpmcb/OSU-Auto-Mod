const qs = require('querystring');
const axios = require('axios');

const postResult = result => console.log(result.data);


// --- Tell the admin's there's a new channel! ---
// Description: Tells the admins when a new channel is created
// Input: Name of the new channel from the event's API
// Output: Posts a new message from the bot to the #admin channel

const newChannel = (name) => {
  let newChannelMessage = {
    token: process.env.SLACK_TOKEN,
    as_user: true,
    link_names: true,
    text: "A new channel was created!  -->  #" + name
  };
  
  newChannelMessage.channel = 'admin';
  const params = qs.stringify(newChannelMessage);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
  sendMessage.then(console.log('New channel created successfully!'));
}


// --- Report something to the admins ---
// Description: Forwards a message from auto mod to the admins
// Input: Text from the DM message someone made to the Auto Mod
// Output: Bot will post the message to the #admin channel
const anonReport = (message) => {
  let adminMessage = {
    token: process.env.SLACK_TOKEN,
    as_user: true,
    link_names: true,
    text: "Someone told me this:\n```\n" + message + "\n```"
  };

  adminMessage.channel = 'admin';
  const params = qs.stringify(adminMessage);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
  sendMessage.then(console.log('Posted a anon message to the Admin channel!'));
}

// --- Respond back to Anon user ---
// Description: Reponds with a simple thank you to anon reporter
// Input: Users internal ID from the Message API
// Output: Bot will repond back to DM from anon user
const anonResponse = (fromUser) => {
  let message = {
    token: process.env.SLACK_TOKEN,
    as_user: true,
    link_names: true,
    text: "Thanks for letting me know! I'll tell the admins anonymously."
  };

  message.channel = fromUser;
  const params = qs.stringify(message);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
  sendMessage.then(console.log('Responded to the anon user!'));
}

// Make the different functions available to the API
module.exports = { 
  newChannel: newChannel,
  anonReport: anonReport,
  anonResponse: anonResponse
};