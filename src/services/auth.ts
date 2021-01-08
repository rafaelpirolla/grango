import firebase from "firebase/app";

import FIREBASE_CONFIG from "./.env.firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

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

  const signUp = (email: string, password: string): any => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (user) => { return user },
        (error) => {
          throw error;
        }
      );
  }

  return {
    login,
    signUp
  }
}
