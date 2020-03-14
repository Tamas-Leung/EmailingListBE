var nodemailer = require('nodemailer');
const fs = require('fs');

var auth_data = JSON.parse(fs.readFileSync('controllers/email_info.json'))



module.exports = {
    createMail: function (profile) {
        return "Baby";
    },

    sendMail: function() {
        console.log(auth_data.name);
        console.log(auth_data.pass);

        var mailOptions = {
            from: 'noreplyemailinglist@gmail.com',
            to: 'tamasfun@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'noreplyemailinglist@gmail.com',
              pass: 'themactal'
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