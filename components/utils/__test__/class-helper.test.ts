import { assertClass, Bem } from '../class-helper'

describe('Class Helper', () => {
  describe('Bem', () => {
    it('should return current block', () => {
      const bem = Bem.of('tk-b')
      expect(bem.b()).toEqual('tk-b')
      expect(bem.b('m1', 'm2')).toEqual('tk-b tk-b--m1 tk-b--m2')
    })

    it('should return current element', () => {
      const bem = Bem.of('tk-b')
      expect(bem.e('e')).toEqual('tk-b__e')
      expect(bem.e('e', 'm1', 'm2')).toEqual('tk-b__e tk-b__e--m1 tk-b__e--m2')
    })

    it('should custom separator work', () => {
      const bem = Bem.of('b', '_', '-')
      expect(bem.b('m1')).toEqual('b b-m1')
      expect(bem.e('e', 'm1')).toEqual('b_e b_e-m1')
    })
  })

  describe('Assert Class', () => {
    it('should return current assert class', () => {
      const className = assertClass({ plain: true, round: false, square: true })
      expect(className).toContain('is-plain')
      expect(className).toContain('is-square')
      expect(className).not.toContain('is-round')
    })

    it('should could customize class prefix', () => {
      const className = assertClass({ checked: true }, 'has-')
      expect(className).toContain('has-checked')
    })
  })
})
