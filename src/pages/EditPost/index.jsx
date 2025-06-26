import { Form, TextInput } from '@/components/Forms'
import { useUpdatePostMutation } from '@/features/posts/postsAPI'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [editPost] = useUpdatePostMutation()
  const { id } = useParams()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const result = await editPost({ data, id }).unwrap()
      navigate(`/posts/${result.postId}`)
    } catch (err) {
      console.error('Create post failed:', err)
    }
  }
  return (
    <>
      <Button
        sx={{ position: 'absolute', top: 40, left: 40 }}
        variant="contained"
        component={Link}
        to="../"
        relative="path"
      >
        Back
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
        }}
      >
        <Container
          disableGutters
          sx={{
            textAlign: 'center',
            mx: 60,
            minWidth: 400,
            '& .MuiInputBase-root.MuiOutlinedInput-root': {
              my: 1,
            },
          }}
        >
          <Form
            defaultValues={{
              title: '',
              description: '',
              content: '',
            }}
            onSubmit={onSubmit}
          >
            <Typography variant="h6" fontWeight={700}>
              Create Post
            </Typography>

            <TextInput name="title" placeholder="Title" fullWidth size="small"></TextInput>
            <TextInput name="description" placeholder="Description" fullWidth size="small"></TextInput>
            <TextInput name="content" placeholder="Content" fullWidth size="small"></TextInput>

            <Button
              disableElevation
              sx={{
                padding: 1,
                transition: 'all .3s cubic-bezier(.645,.045,.355,1)',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
              fullWidth
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Container>
      </Box>
    </>
  )
}

export default EditPost
