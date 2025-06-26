import CommentForm from '../CommentForm'
import Comment from '../Comment'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from '@/features/posts/postsAPI'

const Comments = ({ postId, comments, currentUserId }) => {
  const [createComment] = useCreateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [updateComment] = useUpdateCommentMutation()

  const [activeComment, setActiveComment] = useState(null)

  const rootComments = comments
    .filter((comment) => comment.parentId === null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const handleCreateComment = async (text, parentId = null) => {
    await createComment({
      userId: currentUserId,
      postId,
      parentId,
      content: text,
    })
    setActiveComment(null)
  }
  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId)
  }

  const handleUpdateComment = async (id, text) => {
    const data = {
      content: text,
    }
    await updateComment({ id, data })
    setActiveComment(null)
  }

  return (
    <Box my={2}>
      <Typography variant="h6">Comments</Typography>
      <CommentForm submitLabel="Comment" handleSubmit={handleCreateComment} />
      <Box mt={6}>
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            allComments={comments}
            currentUserId={currentUserId}
            addComment={handleCreateComment}
            updateComment={handleUpdateComment}
            deleteComment={handleDeleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Comments
