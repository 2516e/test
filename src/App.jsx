import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import './App.css'

const Cube = ({ position, size, color }) => {

  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.2
    ref.current.rotation.y += delta * 0.2
    // ref.current.position.z = Math.sin(state.clock.elapsedTime) * 3
  })

  return (
    <mesh position={position} ref={ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} wireframe/>
    </mesh>
  )
}

const Torus = ({ position, size, color }) => {

  const ref = useRef()

  const [isHovered, setIsHovered] = useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.y -= delta * 0.7
  })

  return(
    <mesh 
      position={position} 
      ref={ref} 
      onPointerEnter={(event) => (event.stopPropagation, setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
    >
      <torusGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "orange" : "lightblue"} wireframe/>
    </mesh>
  )
}

const Sphere = ({ position, size, color }) => {
  return(
    <mesh position={position}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}


function App() {
  return (
    <Canvas>
      
      <directionalLight position={[0, 5, 1]} intensity={0.5}/>

      <ambientLight intensity={0.5}/>

      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1 ,1]} />
        <Cube position={[-1, 0, 0]} color={"pink"} size={[1, 1 ,1]} />

        <Cube position={[1, 2, 0]} color={"yellow"} size={[1, 1 ,1]} />
        <Cube position={[-1, 2, 0]} color={"lime"} size={[1, 1 ,1]} />
      </group> */}

      <Cube position={[0, -1, 0]} size={[1.5, 1.5, 1.5]} color={"white"} />

      {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color="red" /> */}

      <Torus position={[0, 2, 0]} size={[0.7, 0.3, 50, 50]} color="red"/>
    </Canvas>
  )
}

export default App