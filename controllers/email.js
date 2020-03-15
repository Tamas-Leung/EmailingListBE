var nodemailer = require('nodemailer');
const fs = require('fs');
const getDb = require("./database").getDb;

var lists = require('./lists');

var auth_data = JSON.parse(fs.readFileSync('controllers/email_info.json'))

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: auth_data.name,
    pass: auth_data.pass
  }
});

module.exports = {
    sendMail: function(list, subject, message) {
      
     
      db = getDb();
      db.collection("lists").doc(list).get().then(data => {
        console.log(data.data());
        recievers = createMailingList(data.data().users);
        console.log(recievers);
        var mailOptions = {
          from: auth_data.name,
          to: recievers,
          subject: subject,
          text: message
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }).catch(err => {
          console.log('Error getting document', err);
      })
    }
    
};

function createMailingList(userList) {
  var string = userList[0];

  for (i = 1; i < userList.length; i++) {
    string += ", " + userList[1];
  }

  return string;
  
}