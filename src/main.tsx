import { Canvas, extend } from '@react-three/fiber'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Vector3 } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import App from './App'
import './index.css'

extend({ TextGeometry })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas
      className="h-full w-full bg-gray-100"
      camera={{ fov: 90, position: new Vector3(-8, 0, 16) }}
    >
      <App />
    </Canvas>
  </React.StrictMode>
)
