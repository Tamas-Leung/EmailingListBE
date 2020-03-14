var nodemailer = require('nodemailer');
const fs = require('fs');

var auth_data = JSON.parse(fs.readFileSync('controllers/email_info.json'))



module.exports = {
    createMail: function (profile) {
        return "Baby";
    },

    sendMail: function(recievers, subject, message) {
        console.log(auth_data.name);
        console.log(auth_data.pass);

        var mailOptions = {
            from: auth_data.name,
            to: recievers,
            subject: subject,
            text: message
        };
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: auth_data.name,
              pass: auth_data.pass
            }
        });
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }
    
};