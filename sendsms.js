var config = require('./config');

var accountSid = 'AC68d8930c02cf1acaee204fc89c1a52c2';
var authToken = 'aae2db88a1ad8645e1f8c36d58fc5db6';
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