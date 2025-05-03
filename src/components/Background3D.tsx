
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useMount } from '@/hooks/useMount';
import * as THREE from 'three';

// A mesmerizing floating sphere field with dynamic wave ripples
const AnimatedSphereField = ({
  count = 60,
  radius = 8,
  sphereSize = 0.2,
  colors = ['#4285F4', '#F97316', '#8B5CF6'],
  speed = 0.5,
}) => {
  // References for our geometry instances
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Create positions and animation parameters for each sphere
  const spheres = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Distribute spheres in a spherical pattern
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const distance = Math.random() * radius * 0.7 + (radius * 0.3);
      
      return {
        position: new THREE.Vector3(
          distance * Math.sin(phi) * Math.cos(theta),
          distance * Math.sin(phi) * Math.sin(theta),
          distance * Math.cos(phi)
        ),
        scale: Math.random() * 0.8 + 0.6,
        speed: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
        colorIndex: Math.floor(Math.random() * colors.length),
      };
    });
  }, [count, radius, colors]);

  // Create dummy objects for instanced mesh
  const dummyObj = useMemo(() => new THREE.Object3D(), []);
  const dummyColor = useMemo(() => new THREE.Color(), []);
  const colorArray = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(colors[spheres[i].colorIndex]);
      color.toArray(array, i * 3);
    }
    return array;
  }, [count, colors, spheres]);

  // Animation frame update
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Rotate the entire group
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.z = Math.sin(time * 0.025) * 0.1;
    }
    
    // Update each sphere - pulsing wave effect
    if (meshRef.current) {
      spheres.forEach((sphere, i) => {
        const { position, scale, speed, phase } = sphere;
        
        // Wave ripple effect on y-axis
        const waveFactor = Math.sin(time * speed + phase) * 0.5;
        
        dummyObj.position.set(
          position.x,
          position.y + waveFactor,
          position.z
        );
        
        // Pulse scale with wave
        const scaleFactor = scale * (1 + Math.sin(time * speed * 0.8 + phase) * 0.2);
        dummyObj.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
        // Apply matrix to instanced mesh
        dummyObj.updateMatrix();
        meshRef.current.setMatrixAt(i, dummyObj.matrix);
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[sphereSize, 16, 16]} />
        <meshStandardMaterial 
          ref={materialRef}
          transparent={true}
          opacity={0.8}
          metalness={0.3}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </instancedMesh>
      {/* Colored spheres using a separate approach */}
      {spheres.map((sphere, i) => (
        <mesh
          key={i}
          position={[
            sphere.position.x,
            sphere.position.y, 
            sphere.position.z
          ]}
          scale={sphere.scale}
          visible={false} // We're using these just for color contribution
        >
          <sphereGeometry args={[0.01, 4, 4]} />
          <meshStandardMaterial color={colors[sphere.colorIndex]} />
        </mesh>
      ))}
    </group>
  );
};

// Radial ripple effect with waves expanding outward
const RadialWaves = ({ color = '#4285F4', speed = 1, count = 5 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current || !meshRef.current.material) return;
    
    const material = meshRef.current.material as THREE.ShaderMaterial;
    const time = clock.getElapsedTime() * speed;
    
    if (material.uniforms) {
      material.uniforms.uTime.value = time;
    }
  });
  
  // Create custom shader material for wave effect
  const waveMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uCount: { value: count },
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
        uniform float uCount;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Create multiple waves with different phases
          float wave = 0.0;
          for (float i = 0.0; i < 10.0; i++) {
            if (i >= uCount) break;
            float phase = i * 0.2;
            wave += sin((dist * 15.0 - uTime + phase) * 3.1415) * 0.5;
          }
          
          float alpha = smoothstep(0.0, 0.2, dist) * smoothstep(0.8, 0.3, dist) * abs(wave);
          gl_FragColor = vec4(uColor, alpha * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [color, count]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <primitive object={waveMaterial} attach="material" />
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
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 2]}>
        {/* Lights */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={directionalIntensity} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={directionalIntensity * 0.4} color={accentColor} />
        
        {/* Main 3D elements */}
        <AnimatedSphereField 
          count={80} 
          colors={[primaryColor, secondaryColor, accentColor]} 
          radius={10}
          sphereSize={0.25}
          speed={0.6}
        />
        
        {/* Radial wave effects */}
        <RadialWaves color={primaryColor} speed={0.5} count={3} />
        <RadialWaves color={accentColor} speed={0.3} count={2} />
        
        {/* Add subtle fog for depth */}
        <fog attach="fog" args={[isDark ? '#121212' : '#f8fafc', 8, 25]} />
      </Canvas>
    </div>
  );
};

export default Background3D;
