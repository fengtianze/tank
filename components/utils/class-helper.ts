export class Bem {
  public static of(block: string, es: string = '__', ms: string = '--') {
    return new Bem(block, es, ms)
  }

  constructor(
    private block: string,
    private elementSeparator: string,
    private modifierSeparator: string,
  ) {}

  public b(...modifierArr: Array<string | undefined>): string {
    return [this.block]
      .concat(
        modifierArr
          .filter(m => !!m)
          .map(modifier => `${this.block}${this.modifierSeparator}${modifier}`),
      )
      .join(' ')
  }

  public e(element: string, ...modifierArr: Array<string | undefined>): string {
    const eString = `${this.block}${this.elementSeparator}${element}`
    return [eString]
      .concat(
        modifierArr
          .filter(m => !!m)
          .map(modifier => `${eString}${this.modifierSeparator}${modifier}`),
      )
      .join(' ')
  }
}

export function assertClass(
  asserts: { [key: string]: boolean | undefined },
  prefix = 'is-',
): string {
  return Object.keys(asserts)
    .filter(key => asserts[key])
    .map(key => `${prefix}${key}`)
    .join(' ')
}
