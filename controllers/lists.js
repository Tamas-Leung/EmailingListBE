const getDb = require("./database").getDb;

var users = require('./users');
const FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    getList: function(list) {
        db = getDb();
        db.collection("lists").doc(list).get().then(data => {
            console.log(data.data());
            return data.data();
        }).catch(err => {
            console.log('Error getting document', err);
        })
    },
    createList: function(name, creator, type, description) {
        db = getDb();
        id = generatePushID();
        db.collection("lists").doc(id).set({
            id: id,
            name: name,
            owners: [creator],
            users: [],
            description: description,
            type: type,
            date: new Date().getUTCDate()
        });
        addListToOwner(creator, id);
        
    },
    addUserToList: function(user, list) {
        db = getDb();
        db.collection("lists").doc(list).update({
            users: FieldValue.arrayUnion(user)
        });
        addListToUser(user, list);

    },
    deleteUserFromList: function(user, list) {
        db = getDb();
        db.collection("lists").doc(list).update({
            users: FieldValue.arrayRemove(user)
        });
        deleteListFromUser(user, list);
    },
    addOwnerToList: function(user, list) {
        db = getDb();
        db.collection("lists").doc(list).update({
            users: FieldValue.arrayUnion(user)
        });
        addListToOwner(user, list);

    },
    deleteOwnerFromList: function(user, list) {
        db = getDb();
        if ( db.collection("lists").doc(list))

        db.collection("lists").doc(list).update({
            users: FieldValue.arrayRemove(user)
        });
        deleteListFromOwner(user, list);
    },
    deleteAllUsersFromList: function(list) {
        db = getDb();
        db.collection("lists").doc(list).get().then(data => {
            usersList = data.data().users;
            console.log(usersList);
            for (user of usersList) {
                this.deleteUserFromList(user, list);
            }
        }).catch(err => {
            console.log('Error getting document', err);
        })
    }
    
    

    
};

function addListToOwner (email, list) {
    
    users.createUserIfNotExist(email, function() {
        db = getDb();
        db.collection('users').doc(email).update({
            ownerList: FieldValue.arrayUnion(list) 
        });
    });

   
};

function deleteListFromOwner (email, list) {

    db = getDb();
    db.collection('users').doc(email).update({
        ownerList: FieldValue.arrayRemove(list) 
    });

    
};

function addListToUser (email, list) {

    users.createUserIfNotExist(email, function (){
        db = getDb();
        db.collection('users').doc(email).update({
            userList: FieldValue.arrayUnion(list) 
        });
    });

    
};

function deleteListFromUser (email, list) {
    
    db = getDb();
    db.collection('users').doc(email).update({
        userList: FieldValue.arrayRemove(list) 
    });
    
};


/*push ID generator made from https://gist.github.com/mikelehen/3596a30bd69384624c11 */
generatePushID = (function() {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  
    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;
  
    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];
  
    return function() {
      var now = new Date().getTime();
      var duplicateTime = (now === lastPushTime);
      lastPushTime = now;
  
      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0) throw new Error('We should have converted the entire timestamp.');
  
      var id = timeStampChars.join('');
  
      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if(id.length != 20) throw new Error('Length should be 20.');
  
      return id;
    };
  })();