"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Stars, Trail } from "@react-three/drei"
import * as THREE from "three"

/* ── Animated AI Core Sphere ── */
function AISphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -state.clock.elapsedTime * 0.1
      glowRef.current.rotation.z = state.clock.elapsedTime * 0.12
      const s = 1.8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      glowRef.current.scale.set(s, s, s)
    }
  })

  return (
    <group>
      {/* Inner distorted sphere — the "AI brain" */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#5ce1e6"
            emissive="#5ce1e6"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Outer glow shell */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial
          color="#5ce1e6"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>
    </group>
  )
}

/* ── Orbiting data particles ── */
function OrbitingParticles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 1.5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#5ce1e6"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ── Orbiting Ring ── */
function OrbitalRing({ radius = 2.5, speed = 0.3, tilt = 0 }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed
    }
  })

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 16, 100]} />
      <meshBasicMaterial color="#5ce1e6" transparent opacity={0.25} />
    </mesh>
  )
}

/* ── Floating Skill Nodes (orbiting dots) ── */
function SkillNode({ angle, radius, speed, size, label }: { angle: number, radius: number, speed: number, size: number, label: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + angle
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.y = Math.sin(t * 0.7) * radius * 0.3
      ref.current.position.z = Math.sin(t) * radius
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + angle) * 0.3
      ref.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color="#5ce1e6"
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

/* ── DNA Helix (representing career path) ── */
function CareerHelix() {
  const ref = useRef<THREE.Group>(null)

  const helixPoints = useMemo(() => {
    const points1: THREE.Vector3[] = []
    const points2: THREE.Vector3[] = []
    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * Math.PI * 4
      const y = (i / 100) * 6 - 3
      points1.push(new THREE.Vector3(Math.cos(t) * 0.4, y, Math.sin(t) * 0.4))
      points2.push(new THREE.Vector3(Math.cos(t + Math.PI) * 0.4, y, Math.sin(t + Math.PI) * 0.4))
    }
    return { points1, points2 }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const helix1Array = useMemo(() => new Float32Array(helixPoints.points1.flatMap(p => [p.x, p.y, p.z])), [helixPoints])
  const helix2Array = useMemo(() => new Float32Array(helixPoints.points2.flatMap(p => [p.x, p.y, p.z])), [helixPoints])

  return (
    <group ref={ref} position={[4, 0, -2]}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[helix1Array, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5ce1e6" transparent opacity={0.3} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[helix2Array, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5ce1e6" transparent opacity={0.3} />
      </line>
    </group>
  )
}

/* ── Main 3D Scene Component ── */
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ minHeight: "500px" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#5ce1e6" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#818cf8" />

        {/* Background stars */}
        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Main AI brain sphere */}
        <AISphere />

        {/* Orbiting data particles */}
        <OrbitingParticles count={150} />

        {/* Orbital rings */}
        <OrbitalRing radius={2.2} speed={0.15} tilt={Math.PI / 6} />
        <OrbitalRing radius={2.8} speed={-0.1} tilt={-Math.PI / 4} />
        <OrbitalRing radius={3.2} speed={0.08} tilt={Math.PI / 3} />

        {/* Orbiting skill nodes */}
        <SkillNode angle={0} radius={2.5} speed={0.3} size={0.06} label="AI" />
        <SkillNode angle={Math.PI / 3} radius={2.8} speed={0.25} size={0.05} label="ML" />
        <SkillNode angle={Math.PI * 2 / 3} radius={2.2} speed={0.35} size={0.07} label="DSA" />
        <SkillNode angle={Math.PI} radius={3} speed={0.2} size={0.04} label="Web" />
        <SkillNode angle={Math.PI * 4 / 3} radius={2.6} speed={0.28} size={0.06} label="Cloud" />
        <SkillNode angle={Math.PI * 5 / 3} radius={2.4} speed={0.32} size={0.05} label="Data" />

        {/* Career DNA helix */}
        <CareerHelix />
      </Canvas>
    </div>
  )
}
