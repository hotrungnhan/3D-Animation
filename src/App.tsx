import { Debug, Physics, useBox, useSphere } from '@react-three/cannon'
import {
  OrbitControls,
  useGLTF,
  Text3D,
  Center,
  useAnimations,
  Stats,
  GizmoViewport,
  GizmoHelper,
  PerspectiveCamera,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { PropsWithChildren, Suspense, useEffect, useRef, useState } from 'react'
import {
  Vector3,
  Mesh,
  DoubleSide,
  Group,
  Camera,
  Euler,
  Quaternion,
} from 'three'
import { MaterialContext, Meterial } from './Material'
function Cube(props?: PropsWithChildren) {
  const [ref, api] = useSphere(
    () => ({
      material: Meterial.ball,
      mass: 0.00000000000000001,
      angularDamping: 0,
      linearDamping: 0,
      position: [8, 10, 8],
    }),
    useRef<Mesh>(null)
  )

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry></boxGeometry>
      <meshStandardMaterial color="hotpink" />
      {props?.children}
    </mesh>
  )
}
function Tokyo(props?: PropsWithChildren) {
  const { scene, animations } = useGLTF('LittlestTokyo.glb')
  const { names, actions } = useAnimations(animations, scene)

  useEffect(() => {
    Object.entries(actions).forEach(([name, action]) => {
      console.log(`playing ${name}`)
      action!.timeScale = 4
      action!.play()
    })
  }, [])

  return (
    <Suspense fallback={null}>
      <group
        rotation={[0, Math.PI / 2, 0]}
        scale={new Vector3(0.02, 0.02, 0.02)}
        position={new Vector3(0, 0, 0)}
      >
        <primitive object={scene} />
      </group>
    </Suspense>
  )
}
function Plane() {
  const size: any = [20, 20, 1]
  const [ref] = useBox(
    () => ({
      material: Meterial.ground,
      args: size,
      position: [0, -4.5, 0],
      rotation: [Math.PI / 2, 0, 0],
      type: 'Static',
      linearDamping: 0,
      angularDamping: 0,
    }),
    useRef<Mesh>(null)
  )
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size}></boxGeometry>
      <meshBasicMaterial side={DoubleSide} color="hotpink" />
    </mesh>
  )
}
function App() {
  const textRef = useRef<Group>(null)
  const { gl, scene, camera, viewport } = useThree()
  const [tick, setStick] = useState<number>(0)
  const subCamera = {
    top: useRef<Camera | null>(null),
    bottom: useRef<Camera | null>(null),
  }
  useFrame((cb, delta) => {
    textRef.current?.rotateY(delta)
    setStick(tick + 1)
    if (tick % 240 == 0) {
      console.log(camera.position, camera.rotation, camera.quaternion)
    }
  })
  useFrame(() => {
    const width = viewport.width * viewport.factor
    const height = viewport.height * viewport.factor
    const screensize = 0.3
    gl.setScissorTest(true)
    //render
    //idont know what going on here
    //camera top
    gl.setScissor(
      width * (1 - screensize),
      height * (1 - screensize),
      width * screensize,
      height * screensize
    )
    gl.setViewport(
      width * (1 - screensize),
      height * (1 - screensize),
      width * screensize,
      height * screensize
    )
    gl.render(scene, subCamera.top.current as Camera)
    //camera bot
    gl.setScissor(
      width * (1 - screensize),
      height * (1 - screensize * 2),
      width * screensize,
      height * screensize
    )
    gl.setViewport(
      width * (1 - screensize),
      height * (1 - screensize * 2),
      width * screensize,
      height * screensize
    )
    gl.render(scene, subCamera.bottom.current as Camera)
    //main
    gl.setViewport(
      0,
      screensize * height,
      width * (1 - screensize),
      height * (1 - screensize)
    )
    gl.setScissor(
      0,
      screensize * height,
      width * (1 - screensize),
      height * (1 - screensize)
    )
  })
  return (
    <>
      <Stats />
      <PerspectiveCamera
        ref={subCamera.top}
        position={new Vector3(0, -1.5, 90)}
        args={[10, 1, 0.1, 1000]}
      ></PerspectiveCamera>
      <PerspectiveCamera
        quaternion={new Quaternion(Math.PI / 4, 0, 0, -Math.PI / 4)}
        position={new Vector3(2, 15, 2)}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
        ref={subCamera.bottom}
        args={[300, 1, 1, 1000]}
      ></PerspectiveCamera>
      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport
          axisColors={['red', 'green', 'blue']}
          labelColor="black"
        />
        {/* alternative: <GizmoViewcube /> */}
      </GizmoHelper>
      <Physics gravity={[0, -9.8, 0]}>
        <MaterialContext />
        <Debug color="green" scale={1.1}>
          <Cube />
          <Plane />
          <Tokyo />
        </Debug>
      </Physics>
      <OrbitControls
        target={new Vector3(0, 0, 0)}
        minDistance={10}
        position0={new Vector3(0, 0, 10)}
      />
      <Center position={[0, 5, 0]} ref={textRef}>
        <Text3D
          font={
            'https://unpkg.com/three@0.77.0/examples/fonts/gentilis_bold.typeface.json'
          }
        >
          Hồ Trung Nhân !
          <meshNormalMaterial />
        </Text3D>
      </Center>
      <pointLight position={new Vector3(20, 0, 20)} color="white">
        <mesh castShadow receiveShadow>
          <sphereGeometry></sphereGeometry>
          <meshBasicMaterial color="yellow" />
        </mesh>
      </pointLight>
      <pointLight position={new Vector3(20, 0, -20)} color="white">
        <mesh castShadow receiveShadow>
          <sphereGeometry></sphereGeometry>
          <meshBasicMaterial color="yellow" />
        </mesh>
      </pointLight>
      <pointLight
        position={new Vector3(-20, 0, 20)}
        intensity={0.1}
        color="yellow"
      >
        <mesh castShadow receiveShadow>
          <sphereGeometry></sphereGeometry>
          <meshBasicMaterial color="yellow" />
        </mesh>
      </pointLight>
      <pointLight position={new Vector3(-20, 0, -20)} color="white">
        <mesh castShadow receiveShadow>
          <sphereGeometry></sphereGeometry>
          <meshBasicMaterial color="yellow" />
        </mesh>
      </pointLight>
      <pointLight
        position={new Vector3(0, 20, 0)}
        intensity={0.7}
        color="white"
      >
        <mesh castShadow receiveShadow>
          <sphereGeometry></sphereGeometry>
          <meshBasicMaterial color="yellow" />
        </mesh>
      </pointLight>
      <pointLight
        position={new Vector3(0, -20, 0)}
        intensity={0.5}
        color="white"
      >
        <mesh castShadow receiveShadow>
          <sphereGeometry></sphereGeometry>
          <meshBasicMaterial color="yellow" />
        </mesh>
      </pointLight>
    </>
  )
}
export default App
