import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// 1. Pre-create the geometry outside the component to reuse memory
const blobGeometry = new THREE.IcosahedronGeometry(1, 5); // Detail reduced from 20 to 5

const OrganicBlob = ({ position, scale, color, speed = 1, distort = 0.4 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        geometry={blobGeometry} // Reusing global geometry
      >
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          roughness={0.7}
          metalness={0.1}
          clearcoat={0}
          flatShading={false}
        />
      </mesh>
    </Float>
  );
};

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        // 2. Performance optimizations for the Canvas
        dpr={[1, 2]} // Caps pixel ratio at 2 for retina screens
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        {/* 3. Disable Environment if performance is still an issue, 
            or use a very low-res preset */}
        <Environment preset="studio" />

        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OrganicBlob
          position={[4, 2, -2]}
          scale={1.8}
          color="#a78bfa"
          speed={1.5}
          distort={0.3}
        />
        <OrganicBlob
          position={[-3, -1.5, 0]}
          scale={1.2}
          color="#7c3aed"
          speed={2}
          distort={0.45}
        />
        <OrganicBlob
          position={[-2, 3, -6]}
          scale={0.8}
          color="#ddd6fe"
          speed={1}
          distort={0.4}
        />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
