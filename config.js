var fs = require('fs');
var cfg = {};

var privateJson = fs.readFileSync('PRIVATE.json');
var privateData = JSON.parse(privateJson);

cfg.accountSid = privateData.twilioKeys.accountSid;
cfg.authToken = privateData.twilioKeys.accountAuthToken;
cfg.sendingNumber = privateData.twilioKeys.phoneNumber;
cfg.receiveNumber = privateData.samPhone;


var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;
