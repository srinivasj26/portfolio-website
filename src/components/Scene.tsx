import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 100;
  const maxDistance = 2.5;
  const maxLines = 800; // Cap line count for performance on low-end devices

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      vel.push(new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02));
    }
    return [pos, vel];
  }, []);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
        positionsAttr.array[i * 3] += velocities[i].x;
        positionsAttr.array[i * 3 + 1] += velocities[i].y;
        positionsAttr.array[i * 3 + 2] += velocities[i].z;

        // Bounce off walls loosely
        if (Math.abs(positionsAttr.array[i * 3]) > 10) velocities[i].x *= -1;
        if (Math.abs(positionsAttr.array[i * 3 + 1]) > 10) velocities[i].y *= -1;
        if (Math.abs(positionsAttr.array[i * 3 + 2]) > 5) velocities[i].z *= -1;
    }
    positionsAttr.needsUpdate = true;

    // Update lines based on distance; cap count for performance
    const linePositions: number[] = [];
    for (let i = 0; i < particleCount && linePositions.length / 6 < maxLines; i++) {
      for (let j = i + 1; j < particleCount && linePositions.length / 6 < maxLines; j++) {
        const dx = positionsAttr.array[i * 3] - positionsAttr.array[j * 3];
        const dy = positionsAttr.array[i * 3 + 1] - positionsAttr.array[j * 3 + 1];
        const dz = positionsAttr.array[i * 3 + 2] - positionsAttr.array[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            positionsAttr.array[i * 3], positionsAttr.array[i * 3 + 1], positionsAttr.array[i * 3 + 2],
            positionsAttr.array[j * 3], positionsAttr.array[j * 3 + 1], positionsAttr.array[j * 3 + 2]
          );
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    // Color attribute could be added for fading lines, mapping opacity to color channels if using vertexColors, 
    // but a basic semi-transparent material does fine for now.
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#0f62fe" transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#1192e8" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
};

const Scene: React.FC = () => {
  return (
    <div className="canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', opacity: 0.6 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};

export default Scene;
