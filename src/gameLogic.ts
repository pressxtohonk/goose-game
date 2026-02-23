export const TILE_WIDTH = 16
export const TILE_HEIGHT = 8
export const WORLD_SIZE = 10
export const BOUNDS = {
  minX: -WORLD_SIZE,
  maxX: WORLD_SIZE,
  minY: -WORLD_SIZE,
  maxY: WORLD_SIZE
}
export const SPEED = 0.08
export const FRAME_COUNT = 8
export const ANIM_SPEED = 8
export const BOB_SPEED = 0.3
export const BOB_AMPLITUDE = 3

export interface Bounds {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export function isoToScreen(x: number, y: number, canvasWidth: number, canvasHeight: number): { x: number; y: number } {
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  return {
    x: (x - y) * (TILE_WIDTH / 2) + centerX,
    y: (x + y) * (TILE_HEIGHT / 2) + centerY
  }
}

export function clampToBounds(x: number, y: number, bounds: Bounds): { x: number; y: number } {
  let clampedX = x
  let clampedY = y
  if (clampedX < bounds.minX) clampedX = bounds.minX
  if (clampedX > bounds.maxX) clampedX = bounds.maxX
  if (clampedY < bounds.minY) clampedY = bounds.minY
  if (clampedY > bounds.maxY) clampedY = bounds.maxY
  return { x: clampedX, y: clampedY }
}

export type Direction = 'left' | 'right'

export const keyDirections: Record<string, { dx: number; dy: number }> = {
  w: { dx: 0, dy: -1 },
  a: { dx: -1, dy: 0 },
  s: { dx: 0, dy: 1 },
  d: { dx: 1, dy: 0 },
  ArrowUp: { dx: 0, dy: -1 },
  ArrowLeft: { dx: -1, dy: 0 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowRight: { dx: 1, dy: 0 }
}

export function calculateMovement(
  keys: Set<string>,
  currentX: number,
  currentY: number,
  speed: number,
  bounds: Bounds
): { x: number; y: number; direction: Direction } {
  let dx = 0
  let dy = 0

  for (const key of keys) {
    const dir = keyDirections[key]
    if (dir) {
      dx += dir.dx
      dy += dir.dy
    }
  }

  if (dx === 0 && dy === 0) {
    return { x: currentX, y: currentY, direction: 'right' }
  }

  let direction: Direction = 'right'
  if (keys.has('a') || keys.has('s') || keys.has('ArrowLeft') || keys.has('ArrowDown')) direction = 'left'
  if (keys.has('d') || keys.has('w') || keys.has('ArrowRight') || keys.has('ArrowUp')) direction = 'right'

  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const nx = (dx / len) * speed
  const ny = (dy / len) * speed

  const { x, y } = clampToBounds(currentX + nx, currentY + ny, bounds)
  return { x, y, direction }
}

export interface AnimationState {
  frame: number
  animTimer: number
  moving: boolean
}

export function updateAnimation(state: AnimationState, isMoving: boolean): AnimationState {
  if (!isMoving) {
    return { frame: 0, animTimer: 0, moving: false }
  }

  let newTimer = state.animTimer + 1
  let newFrame = state.frame

  if (newTimer >= ANIM_SPEED) {
    newTimer = 0
    newFrame = (newFrame + 1) % FRAME_COUNT
  }

  return { frame: newFrame, animTimer: newTimer, moving: true }
}
