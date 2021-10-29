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

function Model() {
  const gltf = useGLTF("/armchairYellow.gltf", true)

  return <primitive object={gltf.scene} dispose={null} />
}

const HTMLContent = () => {
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <mesh position={[0, -35, 0]}>
          <Model />
        </mesh>
        <Html fullscreen>
          <div className='container'>
            <h1 className='title'>Hello</h1>
          </div>
        </Html>
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
        

        <HTMLContent />
      </Canvas>
    </>
  );
}
