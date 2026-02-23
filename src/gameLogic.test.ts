import assert from 'node:assert'
import { isoToScreen, clampToBounds, calculateMovement, updateAnimation, updateGooseState, BOUNDS, ANIM_SPEED, FRAME_COUNT, SPEED, BOB_SPEED } from './gameLogic.js'
import type { GooseState } from './gameLogic.js'

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
  
  console.log('\n## Goose State Update Behaviour Tests')
  
  test('7.1 idle state with no keys returns unchanged position', () => {
    const state: GooseState = { x: 0, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    const keys = new Set<string>()
    const result = updateGooseState(state, keys, BOUNDS)
    assert.strictEqual(result.x, 0)
    assert.strictEqual(result.y, 0)
    assert.strictEqual(result.direction, 'right')
    assert.strictEqual(result.moving, false)
    assert.strictEqual(result.frame, 0)
  })
  
  test('7.2 single key WASD movement updates position and direction', () => {
    const defaultState: GooseState = { x: 0, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    
    const singleKeyTests: { key: string; expectX: number; expectY: number; expectDir: 'left' | 'right' }[] = [
      { key: 'w', expectX: 0, expectY: -SPEED, expectDir: 'right' },
      { key: 'a', expectX: -SPEED, expectY: 0, expectDir: 'left' },
      { key: 's', expectX: 0, expectY: SPEED, expectDir: 'left' },
      { key: 'd', expectX: SPEED, expectY: 0, expectDir: 'right' }
    ]
    
    for (const { key, expectX, expectY, expectDir } of singleKeyTests) {
      const result = updateGooseState(defaultState, new Set([key]), BOUNDS)
      assert.ok(Math.abs(result.x - expectX) < 0.001, `${key}: x should be ${expectX}, got ${result.x}`)
      assert.ok(Math.abs(result.y - expectY) < 0.001, `${key}: y should be ${expectY}, got ${result.y}`)
      assert.strictEqual(result.direction, expectDir, `${key}: direction should be ${expectDir}`)
      assert.strictEqual(result.moving, true, `${key}: moving should be true`)
    }
  })
  
  test('7.2b single key arrow movement updates position and direction', () => {
    const defaultState: GooseState = { x: 0, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    
    const arrowKeyTests: { key: string; expectX: number; expectY: number; expectDir: 'left' | 'right' }[] = [
      { key: 'ArrowUp', expectX: 0, expectY: -SPEED, expectDir: 'right' },
      { key: 'ArrowLeft', expectX: -SPEED, expectY: 0, expectDir: 'left' },
      { key: 'ArrowDown', expectX: 0, expectY: SPEED, expectDir: 'left' },
      { key: 'ArrowRight', expectX: SPEED, expectY: 0, expectDir: 'right' }
    ]
    
    for (const { key, expectX, expectY, expectDir } of arrowKeyTests) {
      const result = updateGooseState(defaultState, new Set([key]), BOUNDS)
      assert.ok(Math.abs(result.x - expectX) < 0.001, `${key}: x should be ${expectX}, got ${result.x}`)
      assert.ok(Math.abs(result.y - expectY) < 0.001, `${key}: y should be ${expectY}, got ${result.y}`)
      assert.strictEqual(result.direction, expectDir, `${key}: direction should be ${expectDir}`)
      assert.strictEqual(result.moving, true, `${key}: moving should be true`)
    }
  })
  
  test('7.3 diagonal WASD movement is normalized', () => {
    const defaultState: GooseState = { x: 0, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    
    const diagonalTests: { keys: string[]; expectDir: 'left' | 'right' }[] = [
      { keys: ['w', 'a'], expectDir: 'right' },
      { keys: ['w', 'd'], expectDir: 'right' },
      { keys: ['s', 'a'], expectDir: 'left' },
      { keys: ['s', 'd'], expectDir: 'right' }
    ]
    
    for (const { keys, expectDir } of diagonalTests) {
      const result = updateGooseState(defaultState, new Set(keys), BOUNDS)
      const dist = Math.sqrt(result.x ** 2 + result.y ** 2)
      assert.ok(Math.abs(dist - SPEED) < 0.001, `${keys.join('+')}: speed should be ${SPEED}, got ${dist}`)
      assert.strictEqual(result.direction, expectDir, `${keys.join('+')}: direction should be ${expectDir}`)
      assert.strictEqual(result.moving, true, `${keys.join('+')}: moving should be true`)
    }
  })
  
  test('7.3b diagonal arrow movement is normalized', () => {
    const defaultState: GooseState = { x: 0, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    
    const diagonalTests: { keys: string[]; expectDir: 'left' | 'right' }[] = [
      { keys: ['ArrowUp', 'ArrowLeft'], expectDir: 'right' },
      { keys: ['ArrowUp', 'ArrowRight'], expectDir: 'right' },
      { keys: ['ArrowDown', 'ArrowLeft'], expectDir: 'left' },
      { keys: ['ArrowDown', 'ArrowRight'], expectDir: 'right' }
    ]
    
    for (const { keys, expectDir } of diagonalTests) {
      const result = updateGooseState(defaultState, new Set(keys), BOUNDS)
      const dist = Math.sqrt(result.x ** 2 + result.y ** 2)
      assert.ok(Math.abs(dist - SPEED) < 0.001, `${keys.join('+')}: speed should be ${SPEED}, got ${dist}`)
      assert.strictEqual(result.direction, expectDir, `${keys.join('+')}: direction should be ${expectDir}`)
      assert.strictEqual(result.moving, true, `${keys.join('+')}: moving should be true`)
    }
  })
  
  test('7.4 boundary clamping at world edges', () => {
    const state: GooseState = { x: -10, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    const keys = new Set(['a'])
    const result = updateGooseState(state, keys, BOUNDS)
    assert.strictEqual(result.x, -10, 'x should be clamped at min boundary')
  })
  
  test('7.5 animation frame advances after ANIM_SPEED updates', () => {
    let state: GooseState = { x: 0, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    const keys = new Set(['d'])
    for (let i = 0; i < ANIM_SPEED; i++) {
      state = updateGooseState(state, keys, BOUNDS)
    }
    assert.strictEqual(state.frame, 1, 'frame should advance after ANIM_SPEED updates')
  })
  
  test('7.6 bob offset increments by BOB_SPEED when moving', () => {
    const state: GooseState = { x: 0, y: 0, direction: 'right', moving: false, frame: 0, animTimer: 0, bobOffset: 0 }
    const keys = new Set(['d'])
    const result = updateGooseState(state, keys, BOUNDS)
    assert.ok(Math.abs(result.bobOffset - BOB_SPEED) < 0.001, `bobOffset should equal BOB_SPEED, got ${result.bobOffset}`)
  })
  
  console.log('\n✓ All tests passed!')
}

runTests()
