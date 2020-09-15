const nodemailer = require('nodemailer');
require("dotenv").config();

const mailerConfig = {    
    host: "smtp.office365.com",  
    secureConnection: true,
    port: 587,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
};
let transporter = nodemailer.createTransport(mailerConfig);

let mailOptions = {
    from: mailerConfig.auth.user,
    to: 'brandond@shoot-straight.com',
    subject: 'Some Subject',
    html: `<body>` +
        `<p>Hey Dude</p>` +
        `</body>`
};

transporter.sendMail(mailOptions, function (error) {
    if (error) {
        console.log('error:', error);
    } else {
        console.log('good');
    }
});