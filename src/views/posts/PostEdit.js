import { Button } from "@material-ui/core";
import React from "react";
import { FirestoreCollection } from "react-firestore";
import deletePost from "../../actions/deletePost";
import updatePost from "../../actions/updatePost";
import { Page } from "../../styles/layout";
import Error from "../misc/Error";
import PostForm from "./PostForm";

const PostEdit = ({ match, history }) => (
  <Page>
    <FirestoreCollection
      path="posts"
      filter={["slug", "==", match.params.slug]}
    >
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <Error />;
        }

        const post = data[0];

        return (
          <div>
            <PostForm
              post={post}
              onSubmit={(values) =>
                updatePost(post.id, values).then(() =>
                  history.push(`/${post.slug}`)
                )
              }
            />
            <Button
              variant="contained"
              onClick={() => deletePost(post).then(() => history.push(`/`))}
              style={{ backgroundColor: "#CB0C0C", color: "#f1eaef" }}
            >
              Delete post
            </Button>
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default PostEdit;
