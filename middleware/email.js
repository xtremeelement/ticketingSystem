const nodemailer = require('nodemailer');
require("dotenv").config();
const db = require('../models')

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


module.exports = {
    userAlert: async function(data){
        const {ticket_number, short_description, long_description, user_id} = data;

        const user = await db.User.findOne({ where: { id: user_id } });
        
        const { email, username } = user;
        
        console.log(data);
        let mailOptions = {
            from: mailerConfig.auth.user,
            to: `${email}`,
            subject: `Ticket: ${ticket_number} has been created`,
            html: `<body>
                <img src="https://shoot-straight.com/wp-content/uploads/2017/01/cropped-logo.png">
                <h1>Hello, ${username}!</h1>
                <h3>Your Ticket has been created</h3>
                <p>Ticket Number: ${ticket_number}</p>
                <p>Ticket Title: ${short_description}</p>
                <p>Ticket Description: ${long_description}</p>
                <a href="http://localhost:8080/user/ticket?ticket=${ticket_number}" target="_blank">Click here to view ticket</a>
                </body>`
        };

        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log('error:', error);
            } else {
                console.log('Email Sent to user');
            }
        });
    },
    supportAlert: async function(data){
        console.log(data);
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
    },
    userTicketUpdated: async function(data){
        console.log(data);
        let mailOptions = {
            from: mailerConfig.auth.user,
            to: 'brandond@shoot-straight.com',
            subject: 'Some Subject',
            html: `<body>` +
                `<p>you ticket 1231231 has been updated</p>` +
                `</body>`
        };

        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log('error:', error);
            } else {
                console.log('good');
            }
        });
    }
} 

