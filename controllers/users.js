
const getDb = require("./database").getDb;
const FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    getUser: function (user) {
        db = getDb();
        db.collection("users").doc(user).get().then(data => {
            return data.data();
        }).catch(err => {
            console.log('Error getting document', err);
        })
        return "error";
    },
    addUser: function (email) {
        db = getDb();
        db.collection('users').doc(email).set({
            email: email,
            ownerList:[],
            userList:[]
        });
    },
    createUserIfNotExist: function(email, callback) {
        db = getDb();
        db.collection('users').doc(email).get().then(doc => {
            if (!doc.exists) {
                this.addUser(email);
                callback();
            } else {
                callback();
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
        })
    }

};