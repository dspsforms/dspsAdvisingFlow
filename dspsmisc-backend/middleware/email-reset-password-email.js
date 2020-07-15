const sanitize = require('mongo-sanitize');
const debug = require('../constants/debug');
const emailConfig = require('../config/emailConfig');

const nodemailer = require("nodemailer");
const transportCreator = require("./email-transport-creator");

// https://www.npmjs.com/package/request-promise
const reqPromise = require('request-promise');


module.exports = (req, res, next) => {
    
    try {
      
        // check if we should send email
        if (!req['sendEmail']) {
            return;
        };

        //  console.log("emailConfig= ", emailConfig);

        // if (emailConfig.emailNoEmail) {
        //     // do not send email
        //     console.log("no email sent, in accordance with emailConfig");
        //     return;
        // }

    
        emailRetrievePasswordLink(emailConfig, req).catch(console.error);
    

    } catch (error) {
        // response has already been sent in previous step of the pipeline
        // res.status(401).json({ message: "email notification failed. formName=" + formName });
    }
};

// async..await is not allowed in global scope, must use a wrapper
async function emailRetrievePasswordLink(emConfig, req){

    // req['emailData'] = { randomStr: randomStr, recipientEmail: sanitizedEmail };
    if (!req.emailData || !req.emailData.randomStr || !req.emailData.recipientEmail) {
        console.log("req.emailData does not have randomStr or recipientEmail or both", req.emailData);
        return;
    }

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: emConfig.host ,  // "mail.authsmtp.com",
    //     port: emConfig.port, // 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //     user: emConfig.authUser,
    //     pass: emConfig.authPassword
    //     }
    // });
    let transporter = transportCreator(emConfig);

    /* 
        this needs to work when the node server is behind the apache proxy
        req.get('host') will return localhost:port 
        someone said req.hostname will return the servername as seen by the client
        but it's not working for us. 
        req.header('x-forwarded-server') works
    
        aside: java equivalents are
            request.getScheme(), request.getServerName(), request.getServerPort()
    */
    
    const serverName = req.header('x-forwarded-server');
    // console.log('x-forwarded-server', serverName);

    const firstPart = req.protocol + '://' + serverName;
    
    const url = firstPart + '/auth/reset-password/' + req.emailData.randomStr;
    // setup email data with unicode symbols

    let text = "Please reset your password by going to the following page" + url + " ." ;
    let html = "Please reset your password by going to the following page <a href='" + url + "'>" + url + "</a>.";

    if (req["RANDOM_KEY_TIME_LIMIT"]) {
        text += ' This link is valid for ' + req["RANDOM_KEY_TIME_LIMIT"] + " minutes.";
        html += ' This link is valid for ' + req["RANDOM_KEY_TIME_LIMIT"] + " minutes." ;
    }

    let mailOptions = {
        from: emConfig.from,  // '"Mission DSPS" <<missiondsps@vannev.com>', // sender address
        to: req.emailData.recipientEmail , // user trying to create account
        subject: "DSPS Forms: reset your password", // Subject line
        text: text, // plain text body
        html: html // html body
    };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

