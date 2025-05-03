
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useMount } from '@/hooks/useMount';
import * as THREE from 'three';

// A dynamic floating cubes animation
const FloatingCubesAnimation = ({
  count = 40,
  size = 0.6,
  colors = ['#4285F4', '#F97316', '#8B5CF6'],
  fieldSize = 12,
  speed = 0.5,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random cube data
  const cubes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * fieldSize,
        (Math.random() - 0.5) * fieldSize,
        (Math.random() - 0.5) * fieldSize
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: Math.random() * 0.6 + 0.4,
      speed: {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        rotation: new THREE.Euler(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        )
      },
      color: colors[Math.floor(Math.random() * colors.length)],
      wireframe: Math.random() > 0.5,
    }));
  }, [count, colors, fieldSize]);

  // Animation loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Cube key={i} {...cube} size={size} />
      ))}
    </group>
  );
};

// Individual cube with animation
const Cube = ({ position, rotation, scale, speed, color, wireframe, size }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Move in a gentle floating pattern
    meshRef.current.position.x += Math.sin(clock.getElapsedTime() * speed.position.x) * 0.01;
    meshRef.current.position.y += Math.cos(clock.getElapsedTime() * speed.position.y) * 0.01;
    meshRef.current.position.z += Math.sin(clock.getElapsedTime() * speed.position.z) * 0.01;
    
    // Rotate continuously
    meshRef.current.rotation.x += speed.rotation.x;
    meshRef.current.rotation.y += speed.rotation.y;
    meshRef.current.rotation.z += speed.rotation.z;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial 
        color={color}
        wireframe={wireframe}
        transparent={true}
        opacity={0.7}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// Glowing grid floor
const GridFloor = ({ size = 20, divisions = 20, color = '#4285F4', glowColor = '#8B5CF6' }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Custom shader for the glowing grid effect
  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color(color) },
        uGlowColor: { value: new THREE.Color(glowColor) },
        uSize: { value: size },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uGlowColor;
        uniform float uSize;
        varying vec2 vUv;
        
        float grid(vec2 uv, float width) {
          vec2 grid = abs(fract(uv - 0.5) - 0.5) / width;
          float line = min(grid.x, grid.y);
          return 1.0 - min(line, 1.0);
        }
        
        void main() {
          // Scale UVs to grid size
          vec2 scaledUv = vUv * uSize;
          
          // Create grid lines
          float gridVal = grid(scaledUv, 0.02);
          
          // Add pulse effect
          float pulse = sin(uTime) * 0.5 + 0.5;
          
          // Mix colors based on grid value
          vec3 color = mix(uColor, uGlowColor, pulse * 0.5);
          
          // Fade out at edges
          float fadeEdge = 1.0 - length(vUv - 0.5) * 1.5;
          fadeEdge = max(0.0, fadeEdge);
          
          gl_FragColor = vec4(color, gridVal * 0.5 * fadeEdge);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [color, glowColor, size]);
  
  // Update time uniform for animation
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[size, size, 1, 1]} />
      <primitive ref={materialRef} object={gridMaterial} />
    </mesh>
  );
};

// Main background component
const Background3D = () => {
  const { theme } = useTheme();
  const isMounted = useMount();
  
  // Don't render on server side to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  const isDark = theme === 'dark';
  
  // Theme-specific colors
  const primaryColor = isDark ? '#4285F4' : '#2563EB';
  const secondaryColor = isDark ? '#F97316' : '#F59E0B';
  const accentColor = isDark ? '#8B5CF6' : '#A855F7';
  const ambientIntensity = isDark ? 0.2 : 0.4;
  const directionalIntensity = isDark ? 1.0 : 0.8;
  
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        {/* Lights */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={directionalIntensity} color="#ffffff" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color={accentColor} />
        
        {/* Main 3D elements */}
        <FloatingCubesAnimation 
          count={40} 
          colors={[primaryColor, secondaryColor, accentColor]} 
          fieldSize={15}
          speed={0.6}
        />
        
        {/* Grid floor effect */}
        <GridFloor 
          color={primaryColor} 
          glowColor={accentColor} 
          size={30} 
          divisions={30}
        />
        
        {/* Add subtle fog for depth */}
        <fog attach="fog" args={[isDark ? '#121212' : '#f8fafc', 10, 30]} />
      </Canvas>
    </div>
  );
};

export default Background3D;
