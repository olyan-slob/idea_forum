const admin = require("firebase-admin");

// update _likeCount on a post when it's liked or unliked
exports.updatePostCommentCount = (change, context) => {
  const postId = change.after.exists
    ? change.after.data().postId
    : change.before.data().postId;
  return getNumberOfPostComments(postId).then((count) =>
    setPostCommentCount(postId, count)
  );
};

const getNumberOfPostComments = (postId) => {
  return admin
    .firestore()
    .collection("postComments")
    .where("postId", "==", postId)
    .get()
    .then((snapshot) => snapshot.size);
};

const setPostCommentCount = (postId, count) => {
  return admin.firestore().collection("posts").doc(postId).update({
    _commentCount: count,
  });
};
