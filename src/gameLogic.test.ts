import assert from 'node:assert'
import { isoToScreen, clampToBounds, calculateMovement, updateAnimation, BOUNDS, ANIM_SPEED, FRAME_COUNT } from './gameLogic.js'

function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (e) {
    console.log(`✗ ${name}`)
    throw e
  }
}

function runTests() {
  console.log('\n## Isometric Rendering Tests')
  
  test('3.1 isoToScreen returns screen center for world origin (0,0)', () => {
    const result = isoToScreen(0, 0, 800, 600)
    assert.strictEqual(result.x, 400)
    assert.strictEqual(result.y, 300)
  })
  
  test('3.2 isoToScreen converts positive x coordinate correctly', () => {
    const result = isoToScreen(1, 0, 800, 600)
    assert.ok(result.x > 400, 'x should be greater than center')
    assert.ok(result.y > 300, 'y should be greater than center (moves down-right)')
  })
  
  test('3.3 isoToScreen converts positive y coordinate correctly', () => {
    const result = isoToScreen(0, 1, 800, 600)
    assert.ok(result.x < 400, 'x should be less than center (moves left)')
    assert.ok(result.y > 300, 'y should be greater than center (moves down-left)')
  })
  
  test('3.4 isoToScreen converts negative coordinates correctly', () => {
    const result = isoToScreen(-1, -1, 800, 600)
    assert.strictEqual(result.x, 400, 'x should be at center when x==y')
    assert.ok(result.y < 300, 'y should be less than center (moves up)')
  })
  
  console.log('\n## Boundary Enforcement Tests')
  
  test('4.1 clampToBounds respects minimum X boundary', () => {
    const result = clampToBounds(-15, 0, BOUNDS)
    assert.strictEqual(result.x, -10)
  })
  
  test('4.2 clampToBounds respects maximum X boundary', () => {
    const result = clampToBounds(15, 0, BOUNDS)
    assert.strictEqual(result.x, 10)
  })
  
  test('4.3 clampToBounds respects minimum Y boundary', () => {
    const result = clampToBounds(0, -15, BOUNDS)
    assert.strictEqual(result.y, -10)
  })
  
  test('4.4 clampToBounds respects maximum Y boundary', () => {
    const result = clampToBounds(0, 15, BOUNDS)
    assert.strictEqual(result.y, 10)
  })
  
  console.log('\n## Movement Tests')
  
  test('5.1 calculateMovement responds to W key (dy decreases)', () => {
    const keys = new Set(['w'])
    const result = calculateMovement(keys, 0, 0, 0.08, BOUNDS)
    assert.ok(result.y < 0, 'y should decrease')
    assert.strictEqual(result.x, 0)
  })
  
  test('5.2 calculateMovement responds to D key (dx increases)', () => {
    const keys = new Set(['d'])
    const result = calculateMovement(keys, 0, 0, 0.08, BOUNDS)
    assert.ok(result.x > 0, 'x should increase')
    assert.strictEqual(result.y, 0)
  })
  
  test('5.3 diagonal movement is normalized', () => {
    const keys = new Set(['w', 'd'])
    const result = calculateMovement(keys, 0, 0, 0.08, BOUNDS)
    const dist = Math.sqrt(result.x ** 2 + result.y ** 2)
    assert.ok(Math.abs(dist - 0.08) < 0.001, `diagonal speed should equal cardinal speed, got ${dist}`)
  })
  
  test('5.4 movement respects boundaries', () => {
    const keys = new Set(['a'])
    const result = calculateMovement(keys, -10, 0, 0.08, BOUNDS)
    assert.strictEqual(result.x, -10, 'x should be clamped to min boundary')
  })
  
  console.log('\n## Animation Tests')
  
  test('6.1 animation advances frame while moving', () => {
    let state = { frame: 0, animTimer: 0, moving: false }
    for (let i = 0; i < ANIM_SPEED; i++) {
      state = updateAnimation(state, true)
    }
    assert.strictEqual(state.frame, 1, 'frame should advance after ANIM_SPEED ticks')
  })
  
  test('6.2 animation resets to frame 0 when stopped', () => {
    const state = { frame: 5, animTimer: 3, moving: true }
    const result = updateAnimation(state, false)
    assert.strictEqual(result.frame, 0)
    assert.strictEqual(result.animTimer, 0)
    assert.strictEqual(result.moving, false)
  })
  
  test('6.3 animation wraps at max frame count', () => {
    let state = { frame: FRAME_COUNT - 1, animTimer: 0, moving: true }
    for (let i = 0; i < ANIM_SPEED; i++) {
      state = updateAnimation(state, true)
    }
    assert.strictEqual(state.frame, 0, 'frame should wrap to 0 after reaching FRAME_COUNT')
  })
  
  console.log('\n✓ All tests passed!')
}

runTests()
