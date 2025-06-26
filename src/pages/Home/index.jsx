import dayjs from 'dayjs'
import Masonry from '@mui/lab/Masonry'
import { Link, useSearchParams } from 'react-router-dom'

import OrbitalSpin from '@/components/OrbitalSpin'

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Pagination,
  PaginationItem,
  Typography,
} from '@mui/material'
import { useGetAllPostsQuery } from '@/features/posts/postsAPI'

function Home() {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit')
  const page = searchParams.get('page')
  const { data, isLoading, error, isSuccess } = useGetAllPostsQuery(
    { limit, page },
    {
      refetchOnMountOrArgChange: true,
    }
  )
  if (isLoading) {
    return <OrbitalSpin />
  }
  if (error) {
    console.error(error)
  }
  if (isSuccess) {
    const posts = data.data
    const handleClick = () => {
      console.info('You clicked the filter chip.')
    }
    return (
      <Box p={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            overflow: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, overflow: 'auto' }}>
            <Chip onClick={handleClick} size="medium" label="All categories" />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Company"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Product"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Design"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Engineering"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
          </Box>

          <Button component={Link} to={`/posts/create`} variant="contained">
            Create new post
          </Button>
        </Box>
        <Pagination
          sx={{ my: 4 }}
          count={data.pagination.totalPages}
          variant="outlined"
          renderItem={(item) => (
            <PaginationItem component={Link} to={`?${item.page === 1 ? '' : `page=${item.page}`}`} {...item} />
          )}
        />
        <Masonry sx={{ textDecoration: 'none', mx: 0 }} columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {posts.map((post) => (
            <Card key={post.id}>
              <CardActionArea sx={{ p: 0.5 }} component={Link} to={`/posts/${post.slug}`}>
                <CardMedia component="img" height="140" image={post.postImg} alt="image" />
                <CardContent>
                  <Typography variant="h6">Title: {post.title}</Typography>
                  <Typography variant="body1">Author: {post.author.name}</Typography>
                  <Typography variant="body2"> Description: {post.description}</Typography>
                  <Typography variant="body2"> {dayjs(post.publishedAt).format('MMM DD, YYYY')}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Masonry>
      </Box>
    )
  }
}

export default Home
