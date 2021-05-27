import { Box, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import commentPost from "../../actions/commentPost";

const CommentForm = ({ postId }) => {
  const [body, setBody] = useState("");

  return (
    <>
      <hr />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Box mt={2} mb={2}>
          <TextField
            value={body}
            onChange={(event) => setBody(event.target.value)}
            label="Comment"
            variant="outlined"
          />
        </Box>
        <Box mb={5}>
          <Button
            variant="contained"
            onClick={() => {
              commentPost(postId, body);
              setBody("");
            }}
            style={{ backgroundColor: "#f1eaef", color: "#3C436B" }}
          >
            Send Comment
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default CommentForm;
