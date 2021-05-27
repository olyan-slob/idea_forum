import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { FormRow } from '../../styles/forms'

const PostForm = ({ onSubmit, post }) => {
    const [title, setTitle] = useState(post?.title || '')
    const [content, setContent] = useState(post?.content || '')

    const isValid = title.length > 3 && content.length > 10

    return (
        <>
            <FormRow>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </FormRow>

            <FormRow>
                <TextField
                    multiline
                    fullWidth
                    label="Content"
                    variant="outlined"
                    rows={6}
                    value={content}
                    helperText={isValid ? '' : 'Type at least 10 symbols'}
                    onChange={(event) => setContent(event.target.value)}
                />
            </FormRow>

            <Button
                disabled={!isValid}
                color="primary"
                variant="contained"
                onClick={() => onSubmit({ title, content })}
            >
                {post ? 'Save' : 'Add'} Post
            </Button>
        </>
    )
}

export default PostForm
