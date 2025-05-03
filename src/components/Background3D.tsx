
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useMount } from '@/hooks/useMount';

// Floating particles component
const ParticleField = ({ count = 100, color, speedFactor = 0.15 }: { count?: number; color: string; speedFactor?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const particles = useRef(Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 15, 
      (Math.random() - 0.5) * 15, 
      (Math.random() - 0.5) * 15
    ],
    scale: Math.random() * 0.5 + 0.1
  })));

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const elapsedTime = clock.getElapsedTime();
    
    particles.current.forEach((particle, i) => {
      const [x, y, z] = particle.position;
      
      // Create gentle floating motion
      dummy.current.position.set(
        x + Math.sin(elapsedTime * speedFactor + i) * 0.2,
        y + Math.cos(elapsedTime * speedFactor + i) * 0.2,
        z + Math.sin(elapsedTime * speedFactor + i * 0.5) * 0.2
      );
      
      dummy.current.scale.setScalar(particle.scale);
      dummy.current.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
};

// Main floating cube component
const FloatingCube = ({ color }: { color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const elapsedTime = clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.5;
    mesh.current.rotation.y = Math.sin(elapsedTime * 0.2) * 0.5;
    mesh.current.position.y = Math.sin(elapsedTime * 0.3) * 0.5;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={0.3} 
      />
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
  const particleColor = isDark ? '#4285F4' : '#2563EB';
  const cubeColor = isDark ? '#8e24aa' : '#6D28D9';
  
  return (
    <div className="fixed inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingCube color={cubeColor} />
        <ParticleField count={200} color={particleColor} />
      </Canvas>
    </div>
  );
};

export default Background3D;
