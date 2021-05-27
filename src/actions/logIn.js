import Firebase from "firebase/app";

const logIn = () => {
  let provider = new Firebase.auth.GoogleAuthProvider();

  return Firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      Firebase.firestore().collection("users").doc(user.uid).set(
        {
          name: user.displayName,
          email: user.email,
          id: user.uid,
          avatar: user.photoURL,
        },
        { merge: true }
      );
    })
    .catch((error) => {
      console.error("could not sign in", error);
    });
};

export default logIn;
