import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export function Debug3JS() {
  const { scene } = useThree()
  useEffect(() => {
    console.log(scene)
  })
  return null
}
