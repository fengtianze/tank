const { compose, curry, defaultTo, ternary, trace } = require('../fns')

describe('Pure Functions', () => {
  describe('Curry', () => {
    it('should curry 0 arguments fn correctly', () => {
      const testFn = jest.fn(() => 0)
      const curriedFn = curry(testFn)
      expect(testFn).not.toBeCalled()

      expect(curriedFn()).toBe(0)
      expect(testFn.mock.calls.length).toBe(1)
      expect(testFn.mock.calls[0].length).toBe(0)
    })

    it('should curry 1 arguments fn correctly', () => {
      const testFn = jest.fn(a1 => a1)
      const curriedFn = curry(testFn)
      expect(testFn).not.toBeCalled()

      expect(curriedFn('arg1')).toBe('arg1')
      expect(testFn.mock.calls.length).toBe(1)
      expect(testFn).toBeCalledWith('arg1')
    })

    it('should curry 2 arguments fn correctly', () => {
      const testFn = jest.fn((a1, a2) => [a1, a2])
      const curriedFn = curry(testFn)
      expect(testFn).not.toBeCalled()

      const calledOnce = curriedFn('arg1')
      expect(typeof calledOnce).toBe('function')
      expect(testFn).not.toBeCalled()

      expect(calledOnce('arg2')).toEqual(['arg1', 'arg2'])
      expect(testFn.mock.calls.length).toBe(1)
      expect(testFn).toBeCalledWith('arg1', 'arg2')
    })

    it('should curry 3 arguments fn correctly', () => {
      const testFn = jest.fn((a1, a2, a3) => [a1, a2, a3])
      const curriedFn = curry(testFn)
      expect(testFn).not.toBeCalled()

      const calledOnce = curriedFn('arg1')
      expect(typeof calledOnce).toBe('function')
      expect(testFn).not.toBeCalled()

      const calledTwice = calledOnce('arg2')
      expect(typeof calledTwice).toBe('function')
      expect(testFn).not.toBeCalled()

      expect(calledTwice('arg3')).toEqual(['arg1', 'arg2', 'arg3'])
      expect(testFn.mock.calls.length).toBe(1)
      expect(testFn).toBeCalledWith('arg1', 'arg2', 'arg3')

      const calledWithTwo = curriedFn('arg1', 'arg2')
      expect(typeof calledWithTwo).toBe('function')
      expect(testFn.mock.calls.length).toBe(1)

      expect(calledWithTwo('arg3')).toEqual(['arg1', 'arg2', 'arg3'])
      expect(testFn.mock.calls.length).toBe(2)
      expect(testFn).toBeCalledWith('arg1', 'arg2', 'arg3')
    })
  })

  describe('Compose', () => {
    it('should return current value', () => {
      const add1 = jest.fn(val => val + 1)
      const divide2 = jest.fn(val => val / 2)

      const composeOne = compose(add1)

      expect(add1).not.toBeCalled()
      expect(composeOne(0)).toBe(1)
      expect(add1.mock.calls.length).toBe(1)
      expect(add1).toBeCalledWith(0)
      add1.mockClear()

      const composeTwo = compose(
        add1,
        divide2,
      )
      expect(add1).not.toBeCalled()
      expect(divide2).not.toBeCalled()
      expect(composeTwo(4)).toBe(3)
      expect(add1.mock.calls.length).toBe(1)
      expect(divide2.mock.calls.length).toBe(1)
      expect(add1).toBeCalledWith(2)
      expect(divide2).toBeCalledWith(4)
    })
  })

  describe('Trace', () => {
    /* eslint-disable no-console */
    const nativeLog = console.log
    const mockLog = jest.fn()

    beforeAll(() => {
      console.log = mockLog
    })

    afterAll(() => {
      console.log = nativeLog
    })

    it('should return current value', () => {
      expect(trace('tag:', 'value')).toBe('value')
      expect(trace('tag:')('value')).toBe('value')
    })

    it('should call console.log correctly', () => {
      mockLog.mockClear()
      trace('tag:', 'value')
      expect(mockLog.mock.calls.length).toBe(1)
      expect(mockLog).toBeCalledWith('tag:', 'value')

      trace('tag:')('value')
      expect(mockLog.mock.calls.length).toBe(2)
      expect(mockLog).toBeCalledWith('tag:', 'value')
    })
    /* eslint-enable no-console */
  })

  describe('DefaultTo', () => {
    it('should return default value', () => {
      expect(defaultTo('default', undefined)).toBe('default')
      expect(defaultTo('default')(undefined)).toBe('default')
    })

    it('should return passed value', () => {
      expect(defaultTo('default', 'value')).toBe('value')
      expect(defaultTo('default', 1)).toBe(1)
      expect(defaultTo('default', true)).toBe(true)
      expect(defaultTo('default', false)).toBe(false)
      expect(defaultTo('default', null)).toBe(null)
      expect(defaultTo('default', 0)).toBe(0)
      expect(defaultTo('default', '')).toBe('')
    })
  })

  describe('Ternary', () => {
    it('should return left value', () => {
      expect(ternary('left', 'right', false)).toBe('left')
      expect(ternary('left', 'right', undefined)).toBe('left')
      expect(ternary('left', 'right', null)).toBe('left')
      expect(ternary('left', 'right')('')).toBe('left')
      expect(ternary('left', 'right')(0)).toBe('left')
    })

    it('should return right value', () => {
      expect(ternary('left', 'right', true)).toBe('right')
      expect(ternary('left', 'right', 1)).toBe('right')
      expect(ternary('left', 'right')('string')).toBe('right')
    })
  })
})
