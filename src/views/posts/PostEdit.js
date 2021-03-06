import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import deletePost from '../../actions/deletePost'
import updatePost from '../../actions/updatePost'
import { Page } from '../../styles/layout'
import Error from '../misc/Error'
import PostForm from './PostForm'

const PostEdit = ({ match, history }) => (
    <Page>
        <FirestoreCollection
            path="posts"
            filter={['slug', '==', match.params.slug]}
        >
            {({ error, isLoading, data }) => {
                if (error) {
                    return <Error error={error} />
                }

                if (isLoading) {
                    return <CircularProgress disableShrink />
                }

                if (data.length === 0) {
                    return <Error />
                }

                const post = data[0]

                return (
                    <div>
                        <PostForm
                            post={post}
                            onSubmit={(values) =>
                                updatePost(post.id, values).then(() =>
                                    history.push(`/${post.slug}`)
                                )
                            }
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                deletePost(post).then(() => history.push(`/`))
                            }
                            style={{ float: 'right' }}
                        >
                            Delete
                        </Button>
                    </div>
                )
            }}
        </FirestoreCollection>
    </Page>
)

export default PostEdit
