import firebase from 'firebase';
import 'firebase/firestore';

import FIREBASE_CONFIG from "./.env.firebase";

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);

export default firebaseApp.firestore();
