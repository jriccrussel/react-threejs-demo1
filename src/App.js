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
const HTMLContent = ({ 
  bgColor,
  domContent,
  children,
  path,
  positionY
}) => {

  const ref = useRef()

  // Spinning going to left
  // useFrame(() => (ref.current.rotation.y -= 0.01))

  // Spinning going to right
  useFrame(() => (ref.current.rotation.y += 0.01))

  // Change BG color onScroll
  const [refItem, inView] = useInView({
    threshold: 0,
  })

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView])

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model path={path} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div className='container' ref={refItem}>{children}</div>
        </Html>
      </group>
    </Section>
  )
}

export default function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

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
            bgColor={'#f15946'}
            domContent={domContent}
          >
            {/* <div className='container'>
              <h1 className='title'>Yellow</h1>
            </div> */}
            <h1 className='title'>Yellow</h1>
          </HTMLContent>

          <HTMLContent
            path="/armchairGreen.gltf"
            positionY={0}
            bgColor={'#571ec1'}
            domContent={domContent}
          >
            <h1 className='title'>Green</h1>
          </HTMLContent>

          <HTMLContent
            path="/armchairGray.gltf"
            positionY={-250}
            bgColor={'#636567'}
            domContent={domContent}
          >
            <h1 className='title'>Gray</h1>
          </HTMLContent>

        </Suspense>
      </Canvas>

      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  )
}
