var express = require('express');
var router = express.Router();

var users = require('../controllers/users')
var email = require('../controllers/email')
var lists = require('../controllers/lists')

router.get('/', function(req, res, next) {
  res.render('emails', { title: 'Email Options' });
});

router.get('/getList', function(req, res, next) {
  res.render(lists.getList(req.body.list));
});

router.post('/sendEmail', function (req, res) {
  email.sendMail(req.body.list, req.body.subject, req.body.message);
  res.status(200).send('Success')
})

router.post('/addUser', function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
  }
  console.log('Got body:', req.body);
  users.addUser(req.body.email.toLowerCase());
  res.status(200).send('Success')
});

router.post('/createList', function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
  }
  lists.createList(req.body.name, req.body.creator.toLowerCase(), req.body.type, req.body.description);
  res.status(200).send('Success')
});

router.post('/addUserToList', function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
  }
  console.log('Got body:', req.body);
  lists.addUserToList(req.body.email.toLowerCase(), req.body.list);
  res.status(200).send('Success')
});

router.post('/deleteUserFromList', function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
  }
  console.log('Got body:', req.body);
  lists.deleteUserFromList(req.body.email.toLowerCase(), req.body.list);
  res.status(200).send('Success')
});

router.post('/addOwnerToList', function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
  }
  console.log('Got body:', req.body);
  lists.addOwnerToList(req.body.email.toLowerCase(), req.body.list);
  res.status(200).send('Success')
});

router.post('/deleteOwnerFromList', function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
  }
  console.log('Got body:', req.body);
  lists.deleteOwnerToList(req.body.email.toLowerCase(), req.body.list);
  res.status(200).send('Success')
});

router.post('/deleteList', function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
  }
  console.log('Got body:', req.body);
  lists.deleteAllUsersFromList(req.body.list);
  res.status(200).send('Success')
});



module.exports = router;
