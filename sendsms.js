var config = require('./config');
var fs = require('fs');

var privateJson = fs.readFileSync('PRIVATE.json');
var privateData = JSON.parse(privateJson);

var accountSid = privateData.twilioKeys.accountSid;
var authToken = privateData.twilioKeys.accountAuthToken;
var sendPhone = config.sendingNumber;
var recievePhone = config.receiveNumber;
var client = require('twilio')(accountSid, authToken);

function sendSamAlert (user, message) {
  var messageBody;

  if (message) {
    messageBody = user + ' - ' + message;
  } else {
    messageBody = user + ' has joined samchat!';
  }

  client.messages.create({
    body: messageBody,
    to: recievePhone,
    from: sendPhone
  }, function(err, message) {
      process.stdout.write(message.sid);
  });
}

module.exports.sendSamAlert = sendSamAlert;
