import { Box } from '@mui/material'
import { motion } from 'framer-motion'

const OrbitalSpin = () => (
  <Box
    component={motion.div}
    sx={{
      width: 100,
      height: 100,
      border: `4px solid currentColor`,
      borderTopColor: 'transparent',
      borderRadius: '50%',
    }}
    animate={{
      rotate: 360,
    }}
    transition={{
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    }}
  />
)

export default OrbitalSpin
