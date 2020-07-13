const sanitize = require('mongo-sanitize');
const debug = require('../constants/debug');
const emailConfig = require('../config/emailConfig');

const nodemailer = require("nodemailer");

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

    
        emailNotifyStudentNewForm(emailConfig, req).catch(console.error);
    

    } catch (error) {
        // response has already been sent in previous step of the pipeline
        // res.status(401).json({ message: "email notification failed. formName=" + formName });
    }
};

// async..await is not allowed in global scope, must use a wrapper
async function emailNotifyStudentNewForm(emConfig, req){

    // req['emailData'] = { randomStr: randomStr, recipientEmail: sanitizedEmail };
    if (!req.emailData ||  !req.emailData.studentEmail) {
        console.log("req.emailData does not have studentEmail", req.emailData);
        return;
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: emConfig.host ,  // "mail.authsmtp.com",
        port: emConfig.port, // 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: emConfig.authUser,
        pass: emConfig.authPassword
        }
    });

    /* 
        this needs to work when the node server is behind the apache proxy
        req.get('host') will return localhost:port 
        someone said req.hostname will return the servername as seen by the client
        but it's not working for us. 
        req.header('x-forwarded-server') works
    
        aside: java equivalents are
            request.getScheme(), request.getServerName(), request.getServerPort()
    */
    
    // this works when the node server is behind apache proxy
    let serverName = req.header('x-forwarded-server');
    // console.log('x-forwarded-server', serverName);

    if (!serverName) {
        // in dev environments.
        serverName = req.header['origin']; // dev angular client
    }

    if (!serverName) {
        serverName = req.header['host']; // dev sever
    }

    if (!serverName) {
        serverName = req.host;
    }

    if (!serverName) {
        console.log('serverName could not be determined. mail not sent to student');
        return;
    }


    const url = req.protocol + '://' + serverName;
    
    let text = "You have new communication from DSPS. Please login and check: " + url + " ." ;
    let html = "You have new communication from DSPS. Please login  and check: <a href='" + url + "'>" + url + "</a>.";

    let mailOptions = {
        from: emConfig.from,  // '"Mission DSPS" <missiondsps@vannev.com', // sender address
        to: req.emailData.studentEmail , 
        subject: "DSPS Forms: you have new communication", // Subject line
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

