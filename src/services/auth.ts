import firebase from "firebase";

import FIREBASE_CONFIG from "./.env.firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const db = firebase.firestore();

const userCollection = db.collection('users');

export default () => {   
  const login = (email: string, password: string): any => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
            (user) => { return user },
            (error) => {
                throw error;
            }
        );
  }

  return {
    login
  }
}
