import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentForm from '../CommentForm'
import { Box, Button, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'

function Comment({
  comment,
  allComments = [],
  currentUserId,
  addComment = () => {},
  deleteComment = () => {},
  updateComment = () => {},
  activeComment,
  setActiveComment,
}) {
  dayjs.extend(relativeTime)
  const canReply = !!currentUserId
  const canEdit = currentUserId === comment.userId
  const canDelete = currentUserId === comment.userId
  const publishedTime = dayjs(comment.createdAt).fromNow()
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === 'replying'
  const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === 'editing'
  const replies = allComments
    .filter((postComment) => postComment.parentId === comment.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return (
    <Box my={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body1" fontWeight={700}>
          {comment.commenter.name}
        </Typography>
        <Typography color="rgb(170, 170, 170)" variant="body2">
          {publishedTime}
        </Typography>
      </Box>
      {!isEditing && (
        <Typography textAlign="justify" variant="body2">
          {comment.content}
        </Typography>
      )}
      {isEditing && (
        <CommentForm
          submitLabel="Edit"
          hasCancelButton
          initialText={comment.content}
          handleSubmit={(text) => updateComment(comment.id, text)}
          handleCancel={() => {
            setActiveComment(null)
          }}
        />
      )}
      <Box>
        {canReply && (
          <Box display="flex" alignItems="center" gap={2}>
            <ThumbUpOutlinedIcon />
            <ThumbDownOffAltOutlinedIcon />
            <Button onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>Reply</Button>
          </Box>
        )}
        {canEdit && <Button onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>Edit</Button>}
        {canDelete && <Button onClick={() => deleteComment(comment.id)}>Delete</Button>}
      </Box>
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          hasCancelButton
          handleCancel={() => {
            setActiveComment(null)
          }}
          handleSubmit={(text) => addComment(text, comment.id)}
        />
      )}
      {replies.length > 0 && (
        <Box ml={8}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              allComments={allComments}
              currentUserId={currentUserId}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Comment
