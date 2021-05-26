const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

const postComments = require("./lib/postComments");

exports.updatePostCommentCount = functions.firestore
  .document("postComments/{postCommentId}")
  .onWrite(postComments.updatePostCommentCount);
