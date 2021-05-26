import React from "react";
import { FormLabel, FormRow, TextArea, TextInput } from "../../styles/forms";

class PostForm extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
    const { title, content } = event.target.elements;
    const values = {
      title: title.value,
      content: content.value,
    };
    this.props.onSubmit(values);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormRow>
          <FormLabel for="title">Title</FormLabel>
          <TextInput
            type="text"
            name="title"
            defaultValue={this.props.post ? this.props.post.title : ""}
            required
          />
        </FormRow>

        <FormRow>
          <FormLabel for="content">Content</FormLabel>
          <TextArea
            type="text"
            name="content"
            defaultValue={this.props.post ? this.props.post.content : ""}
            required
          />
        </FormRow>

        <button type="submit">Save post</button>
      </form>
    );
  }
}

export default PostForm;
