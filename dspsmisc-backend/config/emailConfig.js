const config = require('./config');

const emailConfig = {};

const emailEndPoint = {};
emailEndPoint['bluesheet'] = config.EMAIL_BLUE_SHEET;
emailEndPoint['aap'] = config.EMAIL_AAP;


emailConfig['emailEndPoint'] = emailEndPoint;

emailConfig['from'] =  config.EMAIL_SENDER; // '"Mission-DSPS" <missiondsps@vannev.com>'; // sender address

emailConfig['host'] = config.EMAIL_HOST;
emailConfig['port'] = config.EMAIL_PORT;
emailConfig['authUser'] = config.EMAIL_AUTH_USER;
emailConfig['authPassword'] = config.EMAIL_AUTH_PASS;

emailConfig['emailNoEmail'] = config.EMAIL_NO_EMAIL;


module.exports = emailConfig;
