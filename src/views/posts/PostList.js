import React from "react";
import { FirestoreCollection } from "react-firestore";
import { Page } from "../../styles/layout";
import { InternalLink } from "../../styles/links";
import Error from "../misc/Error";

const PostList = () => (
  <Page>
    <InternalLink to="/new">New post</InternalLink>
    <hr />
    <FirestoreCollection path="posts">
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <p>No posts yet!</p>;
        }
        return (
          <div>
            {data.map((post) => (
              <div key={post.id}>
                <InternalLink to={`/${post.slug}`}>{post.title}</InternalLink>
                <p>
                  {post._commentCount || 0}{" "}
                  {post._commentCount && post._commentCount === 1
                    ? "comment"
                    : "comments"}
                </p>
              </div>
            ))}
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default PostList;
