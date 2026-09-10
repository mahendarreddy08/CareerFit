"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Compass } from "lucide-react"

interface Point3D {
  x: number
  y: number
  z: number
  label?: string
  radius: number
  color: string
}

export function Career3DModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeNode, setActiveNode] = useState<string>("CareerFit AI Core")
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 440)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 440)

    function handleResize() {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener("resize", handleResize)

    // 3D Skill Nodes placed on a sphere
    const skills = [
      "Python",
      "Full Stack",
      "Machine Learning",
      "SQL Data",
      "System Design",
      "React",
      "Git / CI",
      "Algorithms",
      "Docker",
      "Next Best Action",
    ]

    const numNodes = skills.length
    const nodes: Point3D[] = []
    const radius = Math.min(width, height) * 0.36

    // Fibonacci sphere distribution for harmonious 3D placement
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2 // y goes from 1 to -1
      const radAtY = Math.sqrt(1 - y * y)
      const theta = phi * i
      const x = Math.cos(theta) * radAtY
      const z = Math.sin(theta) * radAtY

      nodes.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        label: skills[i],
        radius: i === 9 ? 6 : 4.5,
        color: i === 9 ? "#5ce1e6" : "#f0ede6",
      })
    }

    // Particle constellation
    const numParticles = 35
    const particles: Point3D[] = []
    for (let i = 0; i < numParticles; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phiAngle = Math.acos(2.0 * v - 1.0)
      const r = radius * (0.8 + Math.random() * 0.45)
      const sinPhi = Math.sin(phiAngle)
      particles.push({
        x: r * sinPhi * Math.cos(theta),
        y: r * sinPhi * Math.sin(theta),
        z: r * Math.cos(phiAngle),
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.6 ? "#5ce1e6" : "rgba(255,255,255,0.4)",
      })
    }

    // Interactive Rotation Angles
    let rotX = 0.25
    let rotY = 0.35
    let targetRotX = 0.25
    let targetRotY = 0.35
    let isDragging = false
    let lastMouseX = 0
    let lastMouseY = 0

    const container = containerRef.current
    function onMouseMove(e: MouseEvent) {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left - rect.width / 2
      const mouseY = e.clientY - rect.top - rect.height / 2

      if (isDragging) {
        const deltaX = e.clientX - lastMouseX
        const deltaY = e.clientY - lastMouseY
        rotY += deltaX * 0.008
        rotX += deltaY * 0.008
        targetRotY = rotY
        targetRotX = rotX
        lastMouseX = e.clientX
        lastMouseY = e.clientY
      } else {
        targetRotY = (mouseX / rect.width) * 0.75
        targetRotX = -(mouseY / rect.height) * 0.75
      }
    }

    function onMouseDown(e: MouseEvent) {
      isDragging = true
      lastMouseX = e.clientX
      lastMouseY = e.clientY
    }

    function onMouseUp() {
      isDragging = false
    }

    if (container) {
      container.addEventListener("mousemove", onMouseMove)
      container.addEventListener("mousedown", onMouseDown)
      window.addEventListener("mouseup", onMouseUp)
    }

    const focalLength = 340

    // Render loop
    function render() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      // Smooth interpolation toward target angles
      rotX += (targetRotX - rotX) * 0.05
      rotY += (targetRotY - rotY) * 0.05

      // Constant gentle auto-spin
      targetRotY += 0.0025

      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      const centerX = width / 2
      const centerY = height / 2

      // 1. Draw glowing background aura
      const radial = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.3
      )
      radial.addColorStop(0, "rgba(92, 225, 230, 0.14)")
      radial.addColorStop(0.5, "rgba(92, 225, 230, 0.03)")
      radial.addColorStop(1, "transparent")
      ctx.fillStyle = radial
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2)
      ctx.fill()

      // 2. Draw 3D Orbital Rings (Equator + Inclined)
      const ringAngles = [0, Math.PI / 4, -Math.PI / 4]
      ringAngles.forEach((tilt, rIdx) => {
        ctx.beginPath()
        ctx.strokeStyle =
          rIdx === 0
            ? "rgba(92, 225, 230, 0.28)"
            : "rgba(240, 237, 230, 0.08)"
        ctx.lineWidth = rIdx === 0 ? 1.2 : 0.8

        const ringSegments = 64
        for (let j = 0; j <= ringSegments; j++) {
          const theta = (j / ringSegments) * Math.PI * 2
          const rx = Math.cos(theta) * radius
          const rz = Math.sin(theta) * radius
          // Tilt ring
          const ry = rz * Math.sin(tilt)
          const rzTilted = rz * Math.cos(tilt)

          // Rotate around Y and X
          const x1 = rx * cosY + rzTilted * sinY
          const z1 = -rx * sinY + rzTilted * cosY
          const y1 = ry * cosX - z1 * sinX
          const z2 = ry * sinX + z1 * cosX

          const scale = focalLength / (focalLength + z2)
          const px = centerX + x1 * scale
          const py = centerY + y1 * scale

          if (j === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.stroke()
      })

      // 3. Project and transform nodes
      interface ProjectedPoint {
        px: number
        py: number
        pz: number
        scale: number
        node: Point3D
      }

      const projectedNodes: ProjectedPoint[] = nodes.map((node) => {
        const x1 = node.x * cosY + node.z * sinY
        const z1 = -node.x * sinY + node.z * cosY
        const y1 = node.y * cosX - z1 * sinX
        const z2 = node.y * sinX + z1 * cosX

        const scale = focalLength / (focalLength + z2)
        return {
          px: centerX + x1 * scale,
          py: centerY + y1 * scale,
          pz: z2,
          scale,
          node,
        }
      })

      // 4. Draw neural connection lines between nearby nodes
      ctx.lineWidth = 0.7
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i]!
          const p2 = projectedNodes[j]!

          // Distance in 3D
          const dx = p1.node.x - p2.node.x
          const dy = p1.node.y - p2.node.y
          const dz = p1.node.z - p2.node.z
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist3D < radius * 1.2) {
            const avgZ = (p1.pz + p2.pz) / 2
            const alpha = Math.max(
              0.03,
              Math.min(0.35, ((avgZ + radius) / (radius * 2)) * 0.35)
            )

            ctx.beginPath()
            ctx.strokeStyle = `rgba(92, 225, 230, ${alpha})`
            ctx.moveTo(p1.px, p1.py)
            ctx.lineTo(p2.px, p2.py)
            ctx.stroke()
          }
        }
      }

      // 5. Draw background particles
      particles.forEach((p) => {
        const x1 = p.x * cosY + p.z * sinY
        const z1 = -p.x * sinY + p.z * cosY
        const y1 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX
        const scale = focalLength / (focalLength + z2)

        const px = centerX + x1 * scale
        const py = centerY + y1 * scale
        const alpha = Math.max(
          0.1,
          Math.min(0.6, (z2 + radius) / (radius * 2))
        )

        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1.0
      })

      // 6. Sort projected nodes from back to front (Painter's algorithm)
      projectedNodes.sort((a, b) => a.pz - b.pz)

      // 7. Draw nodes and floating labels
      projectedNodes.forEach((p) => {
        const depthAlpha = Math.max(
          0.25,
          Math.min(1.0, (p.pz + radius * 0.8) / (radius * 1.6))
        )
        const isCore = p.node.label === "Next Best Action"

        // Glow ring for Next Best Action node
        if (isCore) {
          ctx.beginPath()
          ctx.arc(p.px, p.py, (p.node.radius + 6) * p.scale, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(92, 225, 230, 0.18)"
          ctx.fill()
        }

        // Node dot
        ctx.beginPath()
        ctx.arc(p.px, p.py, p.node.radius * p.scale, 0, Math.PI * 2)
        ctx.fillStyle = isCore ? "#5ce1e6" : `rgba(240, 237, 230, ${depthAlpha})`
        ctx.fill()

        // Floating 3D Label
        if (p.node.label) {
          ctx.font = `${Math.round(9.5 * p.scale)}px var(--font-sans, system-ui)`
          ctx.fillStyle = isCore
            ? "#5ce1e6"
            : `rgba(240, 237, 230, ${Math.max(0.3, depthAlpha * 0.85)})`
          ctx.textAlign = "center"
          ctx.fillText(p.node.label, p.px, p.py - (p.node.radius + 5) * p.scale)
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      if (container) {
        container.removeEventListener("mousemove", onMouseMove)
        container.removeEventListener("mousedown", onMouseDown)
        window.removeEventListener("mouseup", onMouseUp)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none group"
    >
      {/* 3D Canvas element */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none transition-transform duration-300"
      />

      {/* Floating 3D Badge Overlay */}
      <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-black/40 border border-white/[0.1] backdrop-blur-md text-[10px] font-mono text-white/60 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6] animate-pulse" />
        <span>3D Career Matrix</span>
      </div>

      {/* Interactive Helper Caption */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#11141a]/80 border border-white/[0.08] backdrop-blur-md text-[10px] font-mono text-white/50 flex items-center gap-1.5 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 opacity-60">
        <Compass className="w-3 h-3 text-[#5ce1e6]" />
        <span>Drag to rotate 3D skill matrix</span>
      </div>
    </div>
  )
}
