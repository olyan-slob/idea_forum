import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import commentPost from "../../actions/commentPost";

const CommentForm = ({ postId }) => {
  const [body, setBody] = useState("");

  return (
    <>
      <TextField
        value={body}
        onChange={(event) => setBody(event.target.value)}
        label="Comment"
        variant="outlined"
      />

      <Button
        variant="contained"
        onClick={() => {
          commentPost(postId, body);
          setBody("");
        }}
      >
        Send Comment
      </Button>
    </>
  );
};

export default CommentForm;
