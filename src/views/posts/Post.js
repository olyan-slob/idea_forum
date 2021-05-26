import React from "react";
import { FirestoreCollection } from "react-firestore";
import { Page } from "../../styles/layout";
import { InternalLink } from "../../styles/links";
import Error from "../misc/Error";
import FirebaseAuth from "../misc/FirebaseAuth";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const Post = ({ match }) => (
  <Page>
    <FirestoreCollection
      path={"posts"}
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
        const postId = post.id;

        return (
          <div>
            <h1>{post.title}</h1>

            <p>{post.content}</p>

            <FirebaseAuth>
              {({ auth }) =>
                auth?.uid === post.createdBy ? (
                  <InternalLink to={`/${post.slug}/edit`}>Edit</InternalLink>
                ) : null
              }
            </FirebaseAuth>

            <CommentForm postId={postId} />
            <CommentList postId={postId} />
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default Post;
