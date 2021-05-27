import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import { Page } from '../../styles/layout'
import { InternalLink } from '../../styles/links'
import Error from '../misc/Error'
import FirebaseAuth from '../misc/FirebaseAuth'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const Post = ({ match }) => (
    <Page>
        <FirestoreCollection
            path={'posts'}
            filter={['slug', '==', match.params.slug]}
        >
            {({ error, isLoading, data }) => {
                if (error) {
                    return <Error error={error} />
                }

                const post = data[0]
                const postId = post?.id

                return (
                    <Fade in={!isLoading}>
                        <Box>
                            {data.length && (
                                <>
                                    <Typography
                                        variant="h2"
                                        style={{ marginBottom: '30px' }}
                                    >
                                        {post.title}
                                    </Typography>

                                    <Typography variant="body1">
                                        {post.content}
                                    </Typography>

                                    <FirebaseAuth>
                                        {({ auth }) =>
                                            auth?.uid === post.createdBy ? (
                                                <InternalLink
                                                    to={`/${post.slug}/edit`}
                                                    style={{
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    Edit
                                                </InternalLink>
                                            ) : null
                                        }
                                    </FirebaseAuth>

                                    <hr />
                                    <CommentForm postId={postId} />
                                    <CommentList postId={postId} />
                                </>
                            )}
                        </Box>
                    </Fade>
                )
            }}
        </FirestoreCollection>
    </Page>
)

export default Post
