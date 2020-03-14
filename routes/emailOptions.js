var express = require('express');
var router = express.Router();

var profiles = require('../controllers/profiles')
var email = require('../controllers/email')

router.get('/', function(req, res, next) {
  res.render('emails', { title: 'Email Options' });
});

router.get('/getProfiles', function(req, res) {
  res.send(profiles.getProfiles());
});

router.get('/sendEmail', function (req, res) {
  email.sendMail();
  res.render('emails', { title: 'Email Options' });

})



module.exports = router;
