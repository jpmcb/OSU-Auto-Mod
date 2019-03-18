
const CLASS_CHANNELS = [
  "161",
  "162",
  "165",
  "199",
  "225",
  "261",
  "271",
  "290",
  "312",
  "321",
  "325",
  "340",
  "344",
  "352",
  "361",
  "362",
  "372",
  "373",
  "381",
  "382",
  "440",
  "444_544",
  "450",
  "461",
  "464",
  "467",
  "472",
  "475",
  "492",
  "493",
  "496"
]

export const isDuplicateChannel = (channelName) => CLASS_CHANNELS.includes(normalizeChannelName(channelName));

// Matches CS..., CS_..., or any lowercase variations there of
export const normalizeChannelName = (channelName) => channelName.replace(/cs_?/i, '');