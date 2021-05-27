import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { FormRow } from "../../styles/forms";

const PostForm = ({ onSubmit, post }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  const isValid = title.length > 3 && content.length > 10;

  return (
    <>
      <FormRow>
        <TextField
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          label="Title"
          variant="outlined"
        />
      </FormRow>

      <FormRow>
        <TextField
          value={content}
          onChange={(event) => setContent(event.target.value)}
          label="Content"
          multiline
          rows={4}
          variant="outlined"
          helperText={isValid ? "" : "Not enough symbols"}
        />
      </FormRow>
      <Box mb={2}>
        <Button
          disabled={!isValid}
          color="primary"
          variant="contained"
          onClick={() => onSubmit({ title, content })}
          style={{ color: "#f1eaef" }}
        >
          {post ? "Edit" : "Add"} Post
        </Button>
      </Box>
    </>
  );
};

export default PostForm;
