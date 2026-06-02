import { useEffect } from 'react'

/**
 * Drives the molecular particle canvas animation in the Hero section.
 * Spawns nodes at random positions, draws bond lines between nearby nodes,
 * and animates them drifting and bouncing off the viewport edges.
 * Exits immediately if disabled (prefers-reduced-motion).
 */

interface Node {
  x: number
  y: number
  vx: number // horizontal velocity -- negative = left, positive = right
  vy: number // vertical velocity -- negative = up, positive = down
  r: number // radius of the dot in pixels
}

// How close two nodes must be (in px) before a bond line is drawn
const CONNECT_DIST_DESKTOP = 130
const CONNECT_DIST_MOBILE = 90

// Total number of nodes in the canvas
const COUNT_DESKTOP = 55
const COUNT_MOBILE = 30

export function useMolecularCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  disabled: boolean
) {
  useEffect(
    function molecularCanvas() {
      const canvas = canvasRef.current
      // Exit early if canvas not mounted or user prefers reduced motion
      if (!canvas || disabled) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // animationId lets us cancel the loop on cleanup
      let animationId: number
      let nodes: Node[] = []

      function isMobile() {
        return window.innerWidth < 768
      }

      // Make the canvas fill the full viewport
      function resize() {
        if (!canvas) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      // Spawn nodes at random positions with random velocity and size
      function initNodes() {
        if (!canvas) return
        const count = isMobile() ? COUNT_MOBILE : COUNT_DESKTOP
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          // (Math.random() - 0.5) gives -0.5 to +0.5 (random direction)
          // × 0.35 slows it down so nodes drift rather than fly
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          // Random radius between 1.5px and 3.5px for visual variation
          r: Math.random() * 2 + 1.5,
        }))
      }

      function drawFrame() {
        if (!canvas || !ctx) return
        const connectDist = isMobile()
          ? CONNECT_DIST_MOBILE
          : CONNECT_DIST_DESKTOP

        // Clear the previous frame before drawing the next one
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // BONDS -- check every unique pair of nodes
        // j starts at i+1 to avoid checking the same pair twice
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x
            const dy = nodes[i].y - nodes[j].y
            // Pythagorean theorem -- straight-line distance between two points
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < connectDist) {
              // Lines fade out as nodes get further apart
              const alpha = (1 - dist / connectDist) * 0.35
              ctx.beginPath()
              ctx.moveTo(nodes[i].x, nodes[i].y)
              ctx.lineTo(nodes[j].x, nodes[j].y)
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          }
        }

        // NODES -- draw each dot and its glow, then move it
        nodes.forEach((n) => {
          // Draw the solid dot
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(56, 189, 248, 0.6)'
          ctx.fill()

          // Draw the soft glow -- a larger circle with a radial gradient
          // that fades from faint blue at center to transparent at edge
          const grd = ctx.createRadialGradient(
            n.x,
            n.y,
            0, // inner circle: center of node, radius 0
            n.x,
            n.y,
            n.r * 5 // outer circle: same center, 5x the dot radius
          )
          grd.addColorStop(0, 'rgba(56,189,248,0.12)')
          grd.addColorStop(1, 'rgba(56,189,248,0)')
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()

          // Move the node by its velocity
          n.x += n.vx
          n.y += n.vy

          // Bounce off walls by reversing the relevant velocity
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        })

        // Schedule the next frame -- this creates the animation loop
        animationId = requestAnimationFrame(drawFrame)
      }

      function handleResize() {
        resize()
        initNodes()
      }

      resize()
      initNodes()
      drawFrame()

      window.addEventListener('resize', handleResize)

      // Cleanup: cancel the animation loop and remove the resize listener
      // This runs when the component unmounts
      return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', handleResize)
      }
    },
    [canvasRef, disabled]
  )
}
