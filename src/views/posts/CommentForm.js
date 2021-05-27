import { Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import commentPost from "../../actions/commentPost";

const CommentForm = ({ postId }) => {
  const [body, setBody] = useState("");

  const isValid = body.length > 1;

  return (
    <Box display="flex" mb={4}>
      <TextField
        helperText={isValid ? "" : "Minimum two symbols"}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        label="Comment"
      />
      <IconButton
        disabled={!isValid}
        color="primary"
        component="span"
        onClick={() => {
          commentPost(postId, body);
          setBody("");
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default CommentForm;
