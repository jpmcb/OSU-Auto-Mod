const qs = require('querystring');
const axios = require('axios');

const postResult = result => console.log(result.data);

// getting error with new channel creation. Welcome bot not in channel?
const newChannel = (name) => {
  let newChannelMessage = {
    token: process.env.SLACK_TOKEN,
    as_user: true,
    link_names: true,
    text: "A new channel was created!  -->  #" + name
  }
  
  newChannelMessage.channel = 'admin';
  const params = qs.stringify(newChannelMessage);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
  sendMessage.then(postResult);
}

module.exports = { newChannel };