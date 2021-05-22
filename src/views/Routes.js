// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from "react";
import { Route, Switch } from "react-router-dom";
import Account from "./account/Account";
import Error from "./misc/Error";
import Post from "./posts/Post";
import PostEdit from "./posts/PostEdit";
import PostList from "./posts/PostList";
import PostNew from "./posts/PostNew";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={PostList} />
    <Route path="/new" component={PostNew} />
    <Route path="/account" component={Account} />
    <Route path="/:slug/edit" component={PostEdit} />
    <Route path="/:slug" component={Post} />
    <Route component={Error} />
  </Switch>
);

export default Routes;
