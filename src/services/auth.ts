import firebase from "firebase";

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
