import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingComponent = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}>
        <CircularProgress />
      </Box>
  )
}

export default LoadingComponent
