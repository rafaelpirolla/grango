import firebase from "firebase";

import FIREBASE_CONFIG from "./.env.firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const db = firebase.firestore();

const userCollection = db.collection('users');

export default () => {   
  const getCollectionData = async (collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>) => {
    const querySnapshot = await collection.get();
    return querySnapshot.docs.map((doc: any) => {
      return { ...doc.data(), id: doc.id };
    });
  }

  const getCollectionId = async (collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, id: any) => {
    return await collection.doc(id).get();
  }

  const loadUser = async (id: any) => {
    return getCollectionId(userCollection, id);
  }

  return {
    loadUser
  }
}
