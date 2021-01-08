import fbase from "firebase";

import FIREBASE_CONFIG from "./.env.firebase";

if (fbase.apps.length === 0) {
  fbase.initializeApp(FIREBASE_CONFIG);
}

const db = fbase.firestore();

const userCollection = db.collection('users');

export default () => {
  const getCollectionData = async (collection: fbase.firestore.CollectionReference<fbase.firestore.DocumentData>) => {
    const querySnapshot = await collection.get();
    return querySnapshot.docs.map((doc: any) => {
      return { ...doc.data(), id: doc.id };
    });
  }

  const getCollectionId = async (collection: fbase.firestore.CollectionReference<fbase.firestore.DocumentData>, id: any) => {
    return await collection.doc(id).get();
  }

  const setCollectionId = async (collection: fbase.firestore.CollectionReference<fbase.firestore.DocumentData>, id: any, name: string, title: string) => {
    return await collection.doc(id).set({
      name: name,
      title: title
    });
  }

  const loadUser = async (id: any) => {
    return getCollectionId(userCollection, id);
  }

  const setUser = async (id: any, name: string, title: string) => {
    return await setCollectionId(userCollection, id, name, title);
  }
  
  return {
    loadUser,
    setUser
  }
}
