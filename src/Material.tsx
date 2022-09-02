import { useContactMaterial } from '@react-three/cannon'
import { Material } from 'cannon-es'
export const Meterial = {
  ground: new Material('ground'),
  ball: new Material('ball'),
}

export function MaterialContext() {
  useContactMaterial(Meterial.ground, Meterial.ball, {
    friction: 0.1,
    restitution: 0.7,
  })
  return null
}
