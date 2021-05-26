import Firebase from "firebase/app";
import { prepareDocForCreate } from "./helpers/firestoreHelpers";

const commentPost = (postId, body) => {
  const comment = prepareDocForCreate({
    postId,
    body,
  });

  return Firebase.firestore().collection("postComments").add(comment);
};

export default commentPost;
