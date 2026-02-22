const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const TILE_WIDTH = 16;
const TILE_HEIGHT = 8;

function resizeCanvas(): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const WORLD_SIZE = 10;
const BOUNDS = {
  minX: -WORLD_SIZE,
  maxX: WORLD_SIZE,
  minY: -WORLD_SIZE,
  maxY: WORLD_SIZE
};

function isoToScreen(x: number, y: number): { x: number; y: number } {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  return {
    x: (x - y) * (TILE_WIDTH / 2) + centerX,
    y: (x + y) * (TILE_HEIGHT / 2) + centerY
  };
}

function getVisibleBounds(): { minX: number; maxX: number; minY: number; maxY: number } {
  return { ...BOUNDS };
}

const grassTile = new Image();
grassTile.src = 'assets/grass.png';

const gooseSheet = new Image();
gooseSheet.src = 'assets/goose-sheet-R.png';

interface GooseState {
  x: number;
  y: number;
  direction: 'left' | 'right';
  moving: boolean;
  frame: number;
  animTimer: number;
  bobOffset: number;
}

const goose: GooseState = {
  x: 0,
  y: 0,
  direction: 'right',
  moving: false,
  frame: 0,
  animTimer: 0,
  bobOffset: 0
};

const keys: Set<string> = new Set();

const keyDirections: Record<string, { dx: number; dy: number }> = {
  w: { dx: 0, dy: -1 },
  a: { dx: -1, dy: 0 },
  s: { dx: 0, dy: 1 },
  d: { dx: 1, dy: 0 },
  ArrowUp: { dx: 0, dy: -1 },
  ArrowLeft: { dx: -1, dy: 0 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowRight: { dx: 1, dy: 0 }
};

const SPEED = 0.08;
const FRAME_COUNT = 8;
const ANIM_SPEED = 8;
const BOB_SPEED = 0.3;
const BOB_AMPLITUDE = 3;

function drawGrassTile(isoX: number, isoY: number): void {
  const screen = isoToScreen(isoX, isoY);
  ctx.drawImage(
    grassTile,
    screen.x - TILE_WIDTH / 2,
    screen.y - TILE_HEIGHT,
    TILE_WIDTH,
    TILE_HEIGHT * 2
  );
}

function render(): void {
  ctx.fillStyle = '#3a5a40';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const bounds = getVisibleBounds();

  for (let y = bounds.minY; y <= bounds.maxY; y++) {
    for (let x = bounds.minX; x <= bounds.maxX; x++) {
      drawGrassTile(x, y);
    }
  }

  drawGoose();
}

function drawGoose(): void {
  const screen = isoToScreen(goose.x, goose.y);
  const bobY = goose.moving ? Math.sin(goose.bobOffset) * BOB_AMPLITUDE : 0;
  const drawY = screen.y + bobY;

  const frameWidth = gooseSheet.width / FRAME_COUNT;
  const frameX = goose.frame * frameWidth;

  ctx.save();
  ctx.translate(screen.x, drawY);
  ctx.scale(goose.direction === 'left' ? -1 : 1, 1);
  ctx.drawImage(gooseSheet, frameX, 0, frameWidth, gooseSheet.height, -frameWidth / 2, -gooseSheet.height, frameWidth, gooseSheet.height);
  ctx.restore();
}

function update(): void {
  let dx = 0;
  let dy = 0;

  for (const key of keys) {
    const dir = keyDirections[key];
    if (dir) {
      dx += dir.dx;
      dy += dir.dy;
    }
  }

  if (dx !== 0 || dy !== 0) {
    goose.moving = true;
    if (keys.has('a') || keys.has('s') || keys.has('ArrowLeft') || keys.has('ArrowDown')) goose.direction = 'left';
    if (keys.has('d') || keys.has('w') || keys.has('ArrowRight') || keys.has('ArrowUp')) goose.direction = 'right';

    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = (dx / len) * SPEED;
    const ny = (dy / len) * SPEED;

    let newX = goose.x + nx;
    let newY = goose.y + ny;

    if (newX < BOUNDS.minX) newX = BOUNDS.minX;
    if (newX > BOUNDS.maxX) newX = BOUNDS.maxX;
    if (newY < BOUNDS.minY) newY = BOUNDS.minY;
    if (newY > BOUNDS.maxY) newY = BOUNDS.maxY;

    goose.x = newX;
    goose.y = newY;

    goose.bobOffset += BOB_SPEED;

    goose.animTimer++;
    if (goose.animTimer >= ANIM_SPEED) {
      goose.animTimer = 0;
      goose.frame = (goose.frame + 1) % FRAME_COUNT;
    }
  } else {
    goose.moving = false;
    goose.frame = 0;
  }
}

function gameLoop(): void {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
  keys.add(e.key);
  if (['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }
});

window.addEventListener('keyup', (e) => {
  keys.delete(e.key);
});

function setupTouchControls(): void {
  const btnMap: Record<string, string> = {
    'up': 'w',
    'left': 'a',
    'down': 's',
    'right': 'd'
  };
  
  for (const [id, key] of Object.entries(btnMap)) {
    const btn = document.getElementById(id)!;
    
    const start = (e: Event) => {
      e.preventDefault();
      keys.add(key);
    };
    const end = (e: Event) => {
      e.preventDefault();
      keys.delete(key);
    };
    
    btn.addEventListener('touchstart', start, { passive: false });
    btn.addEventListener('touchend', end, { passive: false });
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', end);
    btn.addEventListener('mouseleave', end);
  }
}

setupTouchControls();

grassTile.onload = () => {
  gooseSheet.onload = () => {
    gameLoop();
  };
};
