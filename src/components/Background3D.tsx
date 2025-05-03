
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useMount } from '@/hooks/useMount';
import * as THREE from 'three';

// Enhanced connected particle system with more dynamic movement and interactive nodes
const ConnectedParticles = ({ 
  count = 100, 
  color, 
  connectionDistance = 2.5,
  speed = 0.5,
  size = 0.15
}: { 
  count?: number; 
  color: string; 
  connectionDistance?: number;
  speed?: number;
  size?: number;
}) => {
  // Create particles with random positions
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02 * speed,
        (Math.random() - 0.5) * 0.02 * speed,
        (Math.random() - 0.5) * 0.02 * speed
      ),
      originalVelocity: new THREE.Vector3(),
      phase: Math.random() * Math.PI * 2,
      connections: [] as number[],
      size: 0.05 + Math.random() * size * 0.3 // Random size variation
    }));
  }, [count, speed, size]);
  
  // Store original velocities for wave motion calculation
  useMemo(() => {
    particles.forEach(p => {
      p.originalVelocity.copy(p.velocity);
    });
  }, [particles]);

  // Refs for the instances mesh and line segments
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Create the geometry for points
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      sizes[i] = particle.size;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geometry;
  }, [particles, count]);

  // Update animation each frame
  useFrame(({ clock }) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array;
    const elapsedTime = clock.getElapsedTime();
    
    // Reset connections
    particles.forEach(p => p.connections = []);
    
    // Update particle positions with complex motion
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      
      // Complex wave motion based on 3D sine waves
      const xWave = Math.sin(elapsedTime * 0.3 + particle.phase) * 0.04 * speed;
      const yWave = Math.cos(elapsedTime * 0.2 + particle.phase * 1.3) * 0.03 * speed;
      const zWave = Math.sin(elapsedTime * 0.4 + particle.phase * 0.7) * 0.05 * speed;
      
      // Apply wave motion + original velocity
      particle.position.x += particle.originalVelocity.x + xWave;
      particle.position.y += particle.originalVelocity.y + yWave;
      particle.position.z += particle.originalVelocity.z + zWave;
      
      // Boundary check with smooth bounce effect
      const bounds = 7.5;
      const bounceEasing = 0.95; // Smooth bounce
      
      if (Math.abs(particle.position.x) > bounds) {
        particle.originalVelocity.x *= -bounceEasing;
        particle.position.x = Math.sign(particle.position.x) * bounds;
      }
      
      if (Math.abs(particle.position.y) > bounds) {
        particle.originalVelocity.y *= -bounceEasing;
        particle.position.y = Math.sign(particle.position.y) * bounds;
      }
      
      if (Math.abs(particle.position.z) > bounds) {
        particle.originalVelocity.z *= -bounceEasing;
        particle.position.z = Math.sign(particle.position.z) * bounds;
      }
      
      // Pulsating size effect
      sizes[i] = particle.size * (1 + Math.sin(elapsedTime * 2 + particle.phase) * 0.2);
      
      // Update positions array for rendering
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    }
    
    // Find connections between particles with varying opacity based on distance
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    
    const colorObj = new THREE.Color(color);
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);
        
        if (distance < connectionDistance) {
          particles[i].connections.push(j);
          particles[j].connections.push(i);
          
          // Connection opacity based on distance
          const opacity = 1 - (distance / connectionDistance);
          
          // Add both points to create a line segment
          linePositions.push(
            particles[i].position.x, particles[i].position.y, particles[i].position.z,
            particles[j].position.x, particles[j].position.y, particles[j].position.z
          );
          
          // Color with opacity
          lineColors.push(
            colorObj.r, colorObj.g, colorObj.b, opacity,
            colorObj.r, colorObj.g, colorObj.b, opacity
          );
        }
      }
    }
    
    // Update points geometry
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
    
    // Update lines geometry
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    if (linesRef.current.geometry) {
      linesRef.current.geometry.dispose();
    }
    linesRef.current.geometry = lineGeometry;
  });

  // Custom shader material for particles with glow effect
  const pointsMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: color,
      size: size,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
  }, [color, size]);

  // Line material with transparency
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
  }, [color]);

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
  const accentColor = isDark ? '#8B5CF6' : '#A855F7';
  
  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Primary particle system */}
        <ConnectedParticles 
          count={120} 
          color={primaryColor} 
          connectionDistance={3.5} 
          speed={0.4}
          size={0.15}
        />
        
        {/* Secondary particle system with different parameters */}
        <ConnectedParticles 
          count={60} 
          color={secondaryColor} 
          connectionDistance={4} 
          speed={0.3}
          size={0.2}
        />
        
        {/* Accent particle system for more complexity */}
        <ConnectedParticles 
          count={30} 
          color={accentColor} 
          connectionDistance={5} 
          speed={0.25}
          size={0.25}
        />
      </Canvas>
    </div>
  );
};

export default Background3D;
