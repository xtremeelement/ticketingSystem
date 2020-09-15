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

// let mailOptions = {
//     from: mailerConfig.auth.user,
//     to: 'brandond@shoot-straight.com',
//     subject: 'Some Subject',
//     html: `<body>` +
//         `<p>Hey Dude</p>` +
//         `</body>`
// };

// transporter.sendMail(mailOptions, function (error) {
//     if (error) {
//         console.log('error:', error);
//     } else {
//         console.log('good');
//     }
// });

module.exports = {
    userAlert: async function(data){
        const {ticket_number, short_description, long_description, user_id} = data;


        
        const user = await db.User.findOne({ where: { id: user_id } })
        const { id, email, username, role } = user;
        
        console.log(data);
        let mailOptions = {
            from: mailerConfig.auth.user,
            to: `${email}`,
            subject: `Ticket: ${ticket_number} has been created`,
            html: `<body>
                <img src="https://shoot-straight.com/wp-content/uploads/2017/01/cropped-logo.png">
                <h1>Your Ticket has been created</h1>
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
                console.log('good');
            }
        });
    },
    supportAlert: function(data){
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
    userTicketUpdated: function(data){
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

