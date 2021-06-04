import admin = require("firebase-admin");

const firebase = admin.firestore();

export const EnrollmentFormsCollection = firebase.collection('enrollment-forms');
export const JobsCollection = firebase.collection('jobs');
export const MatchesCollection = firebase.collection('matches');
export const UsersCollection = firebase.collection('users');