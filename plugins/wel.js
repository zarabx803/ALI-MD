const config = require("../config");
const {
  cmd,
  commands
} = require("../command");


{cmd({
  'pattern': "wel",
  'desc': "Set the welcome message for the group.",
  'category': "group",
  'react': '👋',
  'filename': __filename
}, async (_0x38c266, _0x3173c4, _0x390a75, {
  from: _0x3f6a31,
  quoted: _0x28a99e,
  body: _0x4ed0ca,
  isCmd: _0x4d0fa4,
  command: _0x400fb2,
  args: _0x3a8f9f,
  q: _0xd0a608,
  isGroup: _0x519fe5,
  sender: _0x19d08d,
  senderNumber: _0x4b3863,
  botNumber2: _0x1aaac2,
  botNumber: _0x5e81eb,
  pushname: _0x37028a,
  isMe: _0x2af145,
  isOwner: _0x5060d5,
  groupMetadata: _0x1378de,
  groupName: _0x463238,
  participants: _0x31482b,
  groupAdmins: _0x5cc3cc,
  isBotAdmins: _0x12d593,
  isAdmins: _0x35af97,
  reply: _0x4c430b
}) => {
  try {
    if (!_0x519fe5) {
      return _0x4c430b("This command can only be used in a group.");
    }
    if (!_0x12d593) {
      return _0x4c430b("Bot must be an admin to use this command.");
    }
    if (!_0x35af97) {
      return _0x4c430b("You must be an admin to use this command.");
    }
    if (!_0xd0a608) {
      return _0x4c430b("Please provide a welcome message.");
    }
    await _0x38c266.sendMessage(_0x3f6a31, {
      'image': {
        'url': config.ALIVE_IMG
      },
      'caption': _0xd0a608
    });
    await _0x4c430b("Welcome message has been set.");
  } catch (_0x416d4f) {
    console.log(_0x416d4f);
    _0x4c430b('' + _0x416d4f);
  }
});
  
