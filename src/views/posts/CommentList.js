import React from "react";
import { FirestoreCollection } from "react-firestore";
import Error from "../misc/Error";

const CommentList = ({ postId }) => (
  <FirestoreCollection path="postComments" filter={["postId", "==", postId]}>
    {({ error, isLoading, data }) => {
      if (error) {
        return <Error error={error} />;
      }

      if (isLoading) {
        return <p>loading...</p>;
      }

      if (data.length === 0) {
        return <p>No comments yet!</p>;
      }
      return (
        <div>
          {data
            .sort((a, b) => b.createdOn.seconds - a.createdOn.seconds)
            .map((comment) => (
              <div key={comment.id}>
                <p>{comment.body}</p>
              </div>
            ))}
        </div>
      );
    }}
  </FirestoreCollection>
);

export default CommentList;
