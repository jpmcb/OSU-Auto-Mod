const qs = require('querystring');
const axios = require('axios');

const postResult = result => console.log(result.data);


const onboardingMessage = "Welcome to the Oregon State Computer Science slack community! This space is intended to fill some of the gaps in student interactions that an online degree tends to be missing. Here you can ask questions about the program, share resources with your classmates, and connect with other students in the program!\n\nConversations in slack are broken up into channels with a specific purpose. Class channels (like #161 and #225) are reserved for topics that relate to that class and that class only. #general is reserved for conversations about the program, OSU, and computer science as a whole. Conversations that overwhelm these channels that are not on topic should be moved to an appropriate channel. All other channels are more casual. Need pointers on interviews? Try #internships or #jobs. Have a photo of your puppy or pizza? Try #pets or #food. Looking for ~hot singles in your area~ local classmates? Search for a location specific channel like #seattle or #sandiego.\n\nIf it looks like a channel is empty, it is because slack limits the number of messages that it will display. This means that messages older than a week will tend to disappear, so be sure to save any information you find useful as you may not be able to find it later!\n\nThere are a few rules to participating in this community. You can find those here: https://docs.google.com/document/d/1LOL-6Xp5mBbZGGqljft5n7fymzbxLpZsboQiTxlFD9I/edit?usp=sharing. Please keep the OSU Code of student Conduct in mind as well: https://studentlife.oregonstate.edu/sites/studentlife.oregonstate.edu/files/code-of-conduct-uploadedmay2018.pdf\n\nThis community is not run by the school or any of its administrators. While you will see some of your professors and TAs hanging around to answer questions and participate in the community, it is 100% run by students and alumni who found slack to be an invaluable resource and are willing to work to make it better. These OKish people are:\n  <@U6K44NQF8>\n  <@U04DSF0MA>\n  <@U06KBVB47>\n  <@U6YBHFPT9>\n  <@U3QKDDW81>\n  <@U59T7NZF0>\n  <@U0PJMG936>\n  <@U05335RQK>\n  <@U0M0GRWMB>\n  <@U57P99CTF>\n  <@U182PFTQD>\n  <@U2DKSFATT>\n  <@U0HKFPZ54>\n\nIf you are having an issue with another user, an off topic conversation has taken over a class channel, or otherwise need admin intervention, please feel free to message any of them at any time.\n\nIf you need to anonymously contact an admin, you can send a Direct Message to me, <@U8VTY86TV>! All messaging information is scrubbed away and your message will be directly forwarded to the Admin channel. Don't believe me? Check out the code here: https://github.com/jpmcb/OSU-Auto-Mod. This should generally be reserved for reporting community guideline violations or anything else that would require immediate moderator attention that users don't feel comfortable having their name associated with.\n\nAbove all else, remember that this is a community for students to connect and share resources, so don't be a jerk and have fun!\n\n(This welcome message is currently in beta! Please message <@U2DKSFATT> or <@U59T7NZF0> if something seems off)";

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

// --- Say hello to a new user ---
// Description: Sends all the onboarding messages to the new user
// Input: User's internal ID from the Message API
// Output: Bot will send onboarding messages to the user
const onboard = (newUser) => {
  let message = {
    token: process.env.SLACK_TOKEN,
    as_user: true,
    link_names: true,
    channel: newUser,
    text: onboardingMessage
  };

  const params = qs.stringify(message);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
  sendMessage.then(console.log('Sent onboarding message!'));
};

// ----- Emoji is added or changed -----
// Description: Handles any and all emoji related subscribed events. 
// Currently handles new emojis added (in addition to new aliases added)
// and emoji's being deleted
const emoji = (event) => {
  let emojiMessage = {
    token: process.env.SLACK_TOKEN,
    as_user: true,
    link_names: true
  };
  
  switch(event.subtype) {
    case("add"): {
      emojiMessage.text = "A new Emoji was uploaded! --> :" + event.name + ":";
      break;
    } case("remove"):{
      emojiMessage.text = "An Emoji was deleted! --> :" + event.names + ":";
      break;
    } default: {
      // If an undefined subtype is present (currently in the slack API, there are only two),
      // then return without sending a message to the admins
      return;
    }
  }

  // Send message to the admin channel
  emojiMessage.channel = 'admin';
  const params = qs.stringify(emojiMessage);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
  sendMessage.then(console.log('Emoji message sent successfully!'));
}

// Make the different functions available to the API
module.exports = { 
  newChannel: newChannel,
  anonReport: anonReport,
  anonResponse: anonResponse,
  onboard: onboard,
  emoji: emoji
};
