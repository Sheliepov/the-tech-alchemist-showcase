
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useMount } from '@/hooks/useMount';
import * as THREE from 'three';

// Connected particle system with lines between nearby particles
const ConnectedParticles = ({ count = 80, color, connectionDistance = 2.5 }: { 
  count?: number; 
  color: string; 
  connectionDistance?: number;
}) => {
  // Create particles with random positions
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
      connections: [] as number[]
    }));
  }, [count]);

  // Refs for the instances mesh and line segments
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Create the geometry for points and lines
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [particles, count]);

  // Update animation each frame
  useFrame(({ clock }) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const elapsedTime = clock.getElapsedTime();
    
    // Reset connections
    particles.forEach(p => p.connections = []);
    
    // Update particle positions with gentle wave-like motion
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      
      // Add wave motion
      particle.position.x += Math.sin(elapsedTime * 0.3 + i * 0.1) * 0.002;
      particle.position.y += Math.cos(elapsedTime * 0.2 + i * 0.1) * 0.002;
      particle.position.z += Math.sin(elapsedTime * 0.1 + i * 0.1) * 0.002;
      
      // Apply velocity for general drift
      particle.position.add(particle.velocity);
      
      // Boundary check - wrap around or bounce
      if (Math.abs(particle.position.x) > 5) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 5) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 5) particle.velocity.z *= -1;
      
      // Update positions array
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    }
    
    // Find connections between particles
    const linePositions: number[] = [];
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);
        
        if (distance < connectionDistance) {
          particles[i].connections.push(j);
          particles[j].connections.push(i);
          
          // Add both points to create a line segment
          linePositions.push(
            particles[i].position.x, particles[i].position.y, particles[i].position.z,
            particles[j].position.x, particles[j].position.y, particles[j].position.z
          );
        }
      }
    }
    
    // Update points geometry
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update lines geometry
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry.dispose();
    linesRef.current.geometry = lineGeometry;
  });

  const pointsMaterial = new THREE.PointsMaterial({
    color: color,
    size: 0.1,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  const lineMaterial = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.5,
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeometry} material={pointsMaterial} />
      <lineSegments ref={linesRef} material={lineMaterial}>
        <bufferGeometry />
      </lineSegments>
    </group>
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
  const primaryColor = isDark ? '#4285F4' : '#2563EB';
  const secondaryColor = isDark ? '#F97316' : '#F59E0B';
  
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Primary particle system */}
        <ConnectedParticles count={80} color={primaryColor} connectionDistance={2.5} />
        
        {/* Secondary particle system with different parameters */}
        <ConnectedParticles count={40} color={secondaryColor} connectionDistance={3} />
      </Canvas>
    </div>
  );
};

export default Background3D;
