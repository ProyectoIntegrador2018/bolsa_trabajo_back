import admin = require("firebase-admin");

const firebase = admin.firestore();

export const UsersCollection = firebase.collection('users');