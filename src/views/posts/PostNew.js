import { Button } from "@material-ui/core";
import React from "react";
import createPost from "../../actions/createPost";
import logIn from "../../actions/logIn";
import { Page } from "../../styles/layout";
import Error from "../misc/Error";
import FirebaseAuth from "../misc/FirebaseAuth";
import PostForm from "./PostForm";

const PostNew = ({ history }) => (
  <Page>
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <div>loading...</div>;
        }

        if (!auth) {
          return (
            <div>
              <p>You must be logged in to add posts</p>
              <Button
                variant="contained"
                onClick={logIn}
                style={{ backgroundColor: "#f1eaef", color: "524450" }}
              >
                log in
              </Button>
            </div>
          );
        }

        return (
          <PostForm
            onSubmit={(values) =>
              createPost(values).then((post) => history.push(`/${post.slug}`))
            }
          />
        );
      }}
    </FirebaseAuth>
  </Page>
);

export default PostNew;
