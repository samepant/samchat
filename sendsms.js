var config = require('./config');

var accountSid = config.accountSid;
var authToken = config.accountAuthToken;
var sendPhone = config.sendingNumber;
var recievePhone = config.receiveNumber;
var client = require('twilio')(accountSid, authToken);
 
client.messages.create({
    body: "testing samAlert system",
    to: recievePhone,
    from: sendPhone
}, function(err, message) {
    process.stdout.write(message.sid);
});