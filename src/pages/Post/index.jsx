import { Link, useParams } from 'react-router-dom'

import { useGetOnePostQuery } from '@/features/posts/postsAPI'
import Comments from '@/components/Comments'
import OrbitalSpin from '@/components/OrbitalSpin'
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'

function Post() {
  const { id } = useParams()
  const { data: postDetail, isLoading, error, isSuccess } = useGetOnePostQuery(id, { refetchOnMountOrArgChange: true })
  if (isLoading) return <OrbitalSpin />
  if (error) {
    console.error(error)
  }
  if (isSuccess) {
    return (
      <Box width={800} py={4}>
        <Box display="flex" justifyContent="space-between">
          <Button sx={{ mb: 2 }} variant="contained" component={Link} to={'/'}>
            Back
          </Button>

          <Button sx={{ mb: 2 }} variant="contained" component={Link} to="edit">
            Edit
          </Button>
        </Box>
        <Card sx={{ p: 2 }} key={postDetail.id}>
          <CardMedia component="img" height={300} image={postDetail.postImg} alt="imgage" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Title: {postDetail.title}
            </Typography>
            <Typography variant="body2"> Description: {postDetail.description}</Typography>
            <Typography variant="body2"> Content: {postDetail.content}</Typography>
          </CardContent>
          <Comments postId={postDetail.id} comments={postDetail.comments} currentUserId={67}></Comments>
        </Card>
      </Box>
    )
  }
}

export default Post
