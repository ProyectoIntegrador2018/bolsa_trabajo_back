import admin = require("firebase-admin");

const firebase = admin.firestore();

export const UsersCollection = firebase.collection('users');
export const EnrollmentFormsCollection = firebase.collection('enrollment-forms');
export const MatchesCollection = firebase.collection('matches');