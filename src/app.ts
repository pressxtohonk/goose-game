type Vector3D = {
	x: number
	y: number
	z: number
}

function vec(x: number, y: number, z: number): Vector3D {
	return { x, y, z }
}

function map(f: (_: number) => number) {
	return function(v: Vector3D) {
		return {
			x: f(v.x),
			y: f(v.y),
			z: f(v.z),

		}
	}
}

function zipWith(f: (a: number, b: number) => number) {
	return function(u: Vector3D, v: Vector3D) {
		return {
			x: f(u.x, v.x),
			y: f(u.y, v.y),
			z: f(u.z, v.z),
		}
	}
}

function reduce(f: (a: number, b: number) => number) {
	return function(...vectors: Vector3D[]) {
		return vectors.reduce(zipWith(f))
	}
}

// Unary operations
const neg = map(a => -a)
const floor = map(Math.floor)
const trunc = map(Math.trunc)

// Binary operations
const add = zipWith((a, b) => a + b)
const sub = zipWith((a, b) => a - b)
const mul = zipWith((a, b) => a * b)
const div = zipWith((a, b) => a / b)
const mod = zipWith((a, b) => a % b)

// N-ary operations
const sum = reduce((a, b) => a + b)
const prod = reduce((a, b) => a * b)
const min = reduce(Math.min)
const max = reduce(Math.max)


function main() {
	const assets = {
		grass: new Image(),
		goose: new Image(),
		gooseL: new Image(),
		gooseR: new Image(),
	}
	assets.grass.src = "./assets/grass.png"
	assets.goose.src = "./assets/goose-R.png"
	assets.gooseL.src = "./assets/goose-sheet-L.png"
	assets.gooseR.src = "./assets/goose-sheet-R.png"

	const grass = {
		name: "grass",
		sprite: {
			sheet: assets.grass,
			width: 16,
			height: 16,
		}
	}

	const goose = {
		name: "goose",
		sprite: {
			sheet: assets.gooseR,
			width: 16,
			height: 16,
			numFrames: 8,
		},
		pos: vec(0, 0, 0), // displacement
		v: vec(0, 0, 0), // velocity
		a: vec(0, 0, 0), // acceleration
	}

	enum Direction { U = "U", D = "D", L = "L", R = "R" }
	const inputs = new Set()

	const buffer = new OffscreenCanvas(128, 128)
	const source = buffer.getContext("2d") as OffscreenCanvasRenderingContext2D

	const canvas = document.getElementById("canvas") as HTMLCanvasElement
	const target = canvas.getContext("2d") as CanvasRenderingContext2D

	var prev: DOMHighResTimeStamp

	function init(time: DOMHighResTimeStamp) {
		// Set uo on-screen canvas
		canvas.width = 320
		canvas.height = 320
		target.imageSmoothingEnabled = false

		// Listen for user inputs
		for (let key in Direction) {
			const button = document.getElementById(`button${key}`) as HTMLButtonElement
			button.ontouchstart = () => inputs.add(key)
			button.ontouchend = () => inputs.delete(key)
		}

		prev = time
		requestAnimationFrame(draw)
	}

	function draw(time: DOMHighResTimeStamp) {
		const dt = (time - prev) / 1000

		// Process user inputs to update goose state
		goose.a = mul(vec(-2, -2, -2), goose.v)
		goose.sprite.sheet = assets.goose

		for (let event of inputs) {
			switch (event) {
				case Direction.U:
					goose.a.y = -1000
					goose.sprite.sheet = assets.gooseR
					break
				case Direction.D:
					goose.a.y = +1000
					goose.sprite.sheet = assets.gooseL
					break
				case Direction.L:
					goose.a.x = -1000
					goose.sprite.sheet = assets.gooseL
					break
				case Direction.R:
					goose.a.x = +1000
					goose.sprite.sheet = assets.gooseR
					break
			}
		}

		const half = vec(0.5, 0.5, 0.5)
		const t = vec(dt, dt, dt)
		const v = sum(goose.v, mul(goose.a, t))
		const d = sum(goose.pos, prod(half, sum(goose.v, v), t))

		goose.v = min(max(v, vec(-200, -200, -200)), vec(200, 200, 200))
		goose.pos = min(max(d, vec(0, 0, 0)), vec(buffer.width - goose.sprite.width, buffer.height - goose.sprite.height, 0))

		// Prepare for render
		function renderGrass(i: number, j: number) {
			// Project to isometric coordinates
			const x = Math.trunc(i / 2 - j / 2 + buffer.width / 2 - grass.sprite.width / 2)
			const y = Math.trunc(i / 4 + j / 4 + buffer.height / 4)

			source.drawImage(
				grass.sprite.sheet,
				0, 0, grass.sprite.width, grass.sprite.height,
				x, y, grass.sprite.width, grass.sprite.height,
			)
		}

		function renderGoose() {
			// Project to isometric coordinates
			const x = Math.trunc(goose.pos.x / 2 - goose.pos.y / 2 + buffer.width / 2 - goose.sprite.width / 2)
			const y = Math.trunc(goose.pos.x / 4 + goose.pos.y / 4 + buffer.height / 4 - goose.sprite.height / 2)

			// Calculate animation frame offset
			const f = 3 * goose.sprite.numFrames / 1000 // frames/ms
			const i = inputs.size == 0
				? 0
				: Math.trunc(time * f) % goose.sprite.numFrames * goose.sprite.width

			source.drawImage(
				goose.sprite.sheet,
				i, 0, goose.sprite.width, goose.sprite.height,
				x, y, goose.sprite.width, goose.sprite.height,
			)
		}

		// Render to low-res buffer
		source.clearRect(0, 0, buffer.width, buffer.height)
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				renderGrass(i * grass.sprite.width, j * grass.sprite.height)
			}
		}
		renderGoose()

		// Copy buffer to screen
		target.clearRect(0, 0, canvas.width, canvas.height)
		target.drawImage(
			buffer,
			0, 0, buffer.width, buffer.height,
			0, 0, canvas.width, canvas.height,
		)
		prev = time
		requestAnimationFrame(draw)
	}

	requestAnimationFrame(init)
}

main()
