import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Form } from '../Forms'

function CommentForm({
  handleSubmit = () => {},
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = '',
}) {
  const [text, setText] = useState(initialText)
  const isTextareaDisabled = text.length === 0
  const onSubmit = () => {
    handleSubmit(text)
    setText('')
  }
  return (
    <Form onSubmit={onSubmit}>
      <Box display="flex" alignItems="flex-end">
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="standard-basic"
          label="WriteComment"
          variant="standard"
          sx={{
            flex: 1,
            '& .MuiFormLabel-root': {
              fontSize: 15,
            },
          }}
        />

        <Button type="submit" disabled={isTextareaDisabled}>
          {submitLabel}
        </Button>
        {hasCancelButton && (
          <Button type="submit" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Form>
  )
}

export default CommentForm
