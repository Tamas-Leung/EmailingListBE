const assert = require("assert");
const admin = require('firebase-admin');

let serviceAccount = require('./emailinglist-a2588-firebase-adminsdk-f497s-244a6d51df.json');

let db;

module.exports = {
    getDb,
    initDb
};

function initDb(callback) {
    if (db) {
        console.warn("Trying to init DB again!");
        return callback(null, db);
    }

    admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
    db = admin.firestore();
}

function getDb() {
    assert.ok(db, "Db has not been initialized. Please called init first.");
    return db;
}