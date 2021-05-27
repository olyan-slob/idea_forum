import { Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FirestoreCollection, FirestoreDocument } from "react-firestore";
import Error from "../misc/Error";

const CommentList = ({ postId }) => {
  return (
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
                  <Card
                    variant="outlined"
                    style={{
                      width: "40%",
                      height: "80px",
                      backgroundColor: "#f8eded",
                      marginBottom: "10px",
                    }}
                  >
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        style={{ fontFamily: "EB Garamond", fontSize: "15px" }}
                      >
                        <FirestoreDocument path={`/users/${comment.createdBy}`}>
                          {(user) => {
                            console.log(user);
                            if (user.isLoading) {
                              return "Loading...";
                            }
                            return user.data?.name || "anonymous";
                          }}
                        </FirestoreDocument>
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ fontFamily: "EB Garamond" }}
                      >
                        <p>{comment.body}</p>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
        );
      }}
    </FirestoreCollection>
  );
};

export default CommentList;
