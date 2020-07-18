const sanitize = require('mongo-sanitize');
const debug = require('../constants/debug');
const emailConfig = require('../config/emailConfig');

const nodemailer = require("nodemailer");

const transportCreator = require("./email-transport-creator");

// returns  https://foo.bar.edu
const serverCreator = require("./email-server-creator");

// https://www.npmjs.com/package/request-promise
const reqPromise = require('request-promise');


module.exports = (req, res, next) => {

  let formName = null;
  try {
    console.log("emailConfig= ", emailConfig);

    if (emailConfig.emailNoEmail) {
      // do not send email
      console.log("no email sent, in accordance with emailConfig");
      return;
    }

    formName = sanitize(req.params.formName);
    console.log("formName= ", formName);

    if(formName && emailConfig.emailEndPoint[formName])  {
      newFormSubmittedNotification(emailConfig, formName, req).catch(console.error);
    }


  } catch (error) {
    console.log(error);
    // res.status(401).json({ message: "email notification failed. formName=" + formName });
  }
};

// async..await is not allowed in global scope, must use a wrapper
async function newFormSubmittedNotification(emConfig, formName, req){

  // create reusable transporter object using the default SMTP transport
  let transporter = transportCreator(emConfig);
  
  // nodemailer.createTransport({
  //   host: emConfig.host ,  // "mail.authsmtp.com",
  //   port: emConfig.port, // 465,
  //   // secure: true, // true for 465, false for other ports
  //   secureConnection: false, // TLS requires secureConnection to be false
  //   auth: {
  //     user: emConfig.authUser,
  //     pass: emConfig.authPassword
  //   },
  //   // https://stackoverflow.com/a/19621282
  //   tls: {
  //     ciphers:'SSLv3'
  //   }
  // });


  let url = serverCreator(req);
  console.log("serverCreator output:", url);

  // /dsps-staff/form/list/bluesheet
  url += "/dsps-staff/form/list/" + formName;

  let text = "DSPS Forms 2: a new " + formName + " has been created. Please login and check " + url ;
  let html = "DSPS Forms 2: a new " + formName + " has been created. Please login and check " +
    " <a href='" + url + "'>" + url + "</a>";


  // setup email data with unicode symbols
  let mailOptions = {
    from: emConfig.from,  // '"Mission DSPS" <missiondsps@vannev.com>', // sender address
    to: emConfig.emailEndPoint[formName], // list of receivers, comma separated
    replyTo: emConfig.replyTo || null,
    subject: "DSPS Forms 2: a new "  + formName + " has been created", // Subject line
    text: text, // plain text body
    html: html // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("email-notify-dsps: Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

