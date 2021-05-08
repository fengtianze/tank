export class Bem {
  static of(block: string, es = '__', ms = '--') {
    return new Bem(block, es, ms);
  }

  constructor(
    private block: string,
    private elementSeparator: string,
    private modifierSeparator: string,
  ) {}

  b(...modifierArr: string[]): string {
    return [this.block]
      .concat(
        modifierArr
          .filter((m) => !!m)
          .map(
            (modifier) => `${this.block}${this.modifierSeparator}${modifier}`,
          ),
      )
      .join(' ');
  }

  e(element: string, ...modifierArr: string[]): string {
    const eString = `${this.block}${this.elementSeparator}${element}`;
    return [eString]
      .concat(
        modifierArr
          .filter((m) => !!m)
          .map((modifier) => `${eString}${this.modifierSeparator}${modifier}`),
      )
      .join(' ');
  }
}

export function assertClass(
  asserts: { [key: string]: boolean },
  prefix = 'is-',
): string {
  return Object.keys(asserts)
    .filter((key) => asserts[key])
    .map((key) => `${prefix}${key}`)
    .join(' ');
}
