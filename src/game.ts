import {
  TILE_WIDTH,
  TILE_HEIGHT,
  BOUNDS,
  FRAME_COUNT,
  BOB_AMPLITUDE,
  isoToScreen,
  updateGooseState,
  keyDirections
} from './gameLogic.js'
import type { GooseState } from './gameLogic.js'

const canvas = document.getElementById('game') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

function resizeCanvas(): void {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

function screenFromWorld(x: number, y: number): { x: number; y: number } {
  return isoToScreen(x, y, canvas.width, canvas.height)
}

const grassTile = new Image()
grassTile.src = 'assets/grass.png'

const gooseSheet = new Image()
gooseSheet.src = 'assets/goose-sheet-R.png'

const goose: GooseState = {
  x: 0,
  y: 0,
  direction: 'right',
  moving: false,
  frame: 0,
  animTimer: 0,
  bobOffset: 0
}

const keys: Set<string> = new Set()

function drawGrassTile(isoX: number, isoY: number): void {
  const screen = screenFromWorld(isoX, isoY)
  ctx.drawImage(
    grassTile,
    screen.x - TILE_WIDTH / 2,
    screen.y - TILE_HEIGHT,
    TILE_WIDTH,
    TILE_HEIGHT * 2
  )
}

function render(): void {
  ctx.fillStyle = '#3a5a40'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let y = BOUNDS.minY; y <= BOUNDS.maxY; y++) {
    for (let x = BOUNDS.minX; x <= BOUNDS.maxX; x++) {
      drawGrassTile(x, y)
    }
  }

  drawGoose()
}

function drawGoose(): void {
  const screen = screenFromWorld(goose.x, goose.y)
  const bobY = goose.moving ? Math.sin(goose.bobOffset) * BOB_AMPLITUDE : 0
  const drawY = screen.y + bobY

  const frameWidth = gooseSheet.width / FRAME_COUNT
  const frameX = goose.frame * frameWidth

  ctx.save()
  ctx.translate(screen.x, drawY)
  ctx.scale(goose.direction === 'left' ? -1 : 1, 1)
  ctx.drawImage(gooseSheet, frameX, 0, frameWidth, gooseSheet.height, -frameWidth / 2, -gooseSheet.height, frameWidth, gooseSheet.height)
  ctx.restore()
}

function update(): void {
  const newState = updateGooseState(goose, keys, BOUNDS)
  goose.x = newState.x
  goose.y = newState.y
  goose.direction = newState.direction
  goose.moving = newState.moving
  goose.frame = newState.frame
  goose.animTimer = newState.animTimer
  goose.bobOffset = newState.bobOffset
}

function gameLoop(): void {
  update()
  render()
  requestAnimationFrame(gameLoop)
}

window.addEventListener('keydown', (e) => {
  keys.add(e.key)
  if (['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault()
  }
})

window.addEventListener('keyup', (e) => {
  keys.delete(e.key)
})

function setupTouchControls(): void {
  const btnMap: Record<string, string> = {
    'up': 'w',
    'left': 'a',
    'down': 's',
    'right': 'd'
  }

  for (const [id, key] of Object.entries(btnMap)) {
    const btn = document.getElementById(id)!

    const start = (e: Event) => {
      e.preventDefault()
      keys.add(key)
    }
    const end = (e: Event) => {
      e.preventDefault()
      keys.delete(key)
    }

    btn.addEventListener('touchstart', start, { passive: false })
    btn.addEventListener('touchend', end, { passive: false })
    btn.addEventListener('mousedown', start)
    btn.addEventListener('mouseup', end)
    btn.addEventListener('mouseleave', end)
  }
}

setupTouchControls()

grassTile.onload = () => {
  gooseSheet.onload = () => {
    gameLoop()
  }
}
