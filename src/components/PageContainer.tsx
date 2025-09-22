import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
      {children}
    </Box>
  )
}

