import * as admin from "firebase-admin";

const firestore = admin.firestore();

export const UsersCollection = firestore.collection('users');