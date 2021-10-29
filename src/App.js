import React, { useRef, useEffect, useState, Suspense } from "react"
import "./App.css"
//Components
import Header from "./components/header"
import { Section } from "./components/section"

// Page State
import state from "./components/state"

// R3F
import { Canvas, useFrame } from "react-three-fiber"
import { Html, useProgress, useGLTF } from "@react-three/drei"

// React Spring
import { a, useTransition } from "@react-spring/web"
//Intersection Observer
import { useInView } from "react-intersection-observer"

function Model({path}) {
  const gltf = useGLTF(path, true)
  return <primitive object={gltf.scene} dispose={null} />
}

// Lights
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3}  />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        position={[0, 10, 0]}
        intensity={1.5}
      />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  )
} 

// Model & Content
const HTMLContent = ({children, path, positionY}) => {
  const ref = useRef()

  // Spinning going to left
  // useFrame(() => (ref.current.rotation.y -= 0.01))

  // Spinning going to right
  useFrame(() => (ref.current.rotation.y += 0.01))

  

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model path={path} />
        </mesh>
        <Html fullscreen>{children}</Html>
      </group>
    </Section>
  )
}

export default function App() {
  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}>
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            path="/armchairYellow.gltf"
            positionY={250}
          >
            <div className='container'>
              <h1 className='title'>Hello</h1>
            </div>
          </HTMLContent>
        </Suspense>
      </Canvas>
    </>
  )
}
