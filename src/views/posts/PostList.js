import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FirestoreCollection, FirestoreDocument } from "react-firestore";
import { useHistory } from "react-router-dom";
import { Page } from "../../styles/layout";
import { InternalLink } from "../../styles/links";
import Error from "../misc/Error";

const PostList = () => {
  const history = useHistory();
  return (
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

          const truncate = (string) => {
            if (string.length <= 20) {
              return string;
            }
            return string.slice(0, 20) + "...";
          };

          return (
            <div>
              {data
                .sort((a, b) => b.createdOn.seconds - a.createdOn.seconds)
                .map((post) => (
                  <Card
                    key={post.id}
                    style={{ backgroundColor: "#f8eded", margin: "10px" }}
                  >
                    <CardActionArea
                      onClick={() => history.push(`/${post.slug}`)}
                    >
                      <CardContent>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          style={{ fontFamily: "EB Garamond" }}
                        >
                          <FirestoreDocument path={`/users/${post.createdBy}`}>
                            {(user) => {
                              if (user.isLoading) {
                                return "Loading...";
                              }
                              return user.data.name;
                            }}
                          </FirestoreDocument>
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h2"
                          style={{ fontFamily: "EB Garamond" }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{ fontFamily: "EB Garamond" }}
                        >
                          {truncate(post.content)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
            </div>
          );
        }}
      </FirestoreCollection>
    </Page>
  );
};

export default PostList;
