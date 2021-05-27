import { Box, Card, CardContent } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import { FirestoreCollection, FirestoreDocument } from 'react-firestore'
import Error from '../misc/Error'

const CommentList = ({ postId }) => {
    return (
        <FirestoreCollection
            path="postComments"
            filter={['postId', '==', postId]}
        >
            {({ error, isLoading, data }) => {
                if (error) {
                    return <Error error={error} />
                }

                return (
                    <Fade in={!isLoading}>
                        <Box>
                            {data.length ? (
                                data
                                    .sort(
                                        (a, b) =>
                                            b.createdOn.seconds -
                                            a.createdOn.seconds
                                    )
                                    .map((comment) => (
                                        <Card
                                            key={comment.id}
                                            variant="outlined"
                                            style={{
                                                backgroundColor: '#f8eded',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <CardContent>
                                                <FirestoreDocument
                                                    path={`/users/${comment.createdBy}`}
                                                >
                                                    {(user) => {
                                                        if (user.isLoading) {
                                                            return (
                                                                <Skeleton
                                                                    animation="wave"
                                                                    width={110}
                                                                />
                                                            )
                                                        }
                                                        return (
                                                            <Typography
                                                                color="textSecondary"
                                                                gutterBottom
                                                                style={{
                                                                    fontFamily:
                                                                        'EB Garamond',
                                                                    fontSize:
                                                                        '15px',
                                                                }}
                                                            >
                                                                {user.data
                                                                    ?.name ||
                                                                    'anonymous'}{' '}
                                                            </Typography>
                                                        )
                                                    }}
                                                </FirestoreDocument>

                                                <Typography
                                                    variant="body2"
                                                    component="p"
                                                    style={{
                                                        fontFamily:
                                                            'EB Garamond',
                                                    }}
                                                >
                                                    {comment.body}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))
                            ) : (
                                <p>No comments yet!</p>
                            )}
                        </Box>
                    </Fade>
                )
            }}
        </FirestoreCollection>
    )
}

export default CommentList
