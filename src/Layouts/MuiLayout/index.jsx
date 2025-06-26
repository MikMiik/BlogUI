import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

function MuiLayout() {
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default MuiLayout
