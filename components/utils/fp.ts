export function curry(fn: (...args: Array<unknown>) => any) {
  const caller = (restLength: number, prevArgs: Array<unknown>) => {
    return (...currentArgs: Array<unknown>) => {
      return currentArgs.length < restLength
        ? caller(restLength - currentArgs.length, [...prevArgs, ...currentArgs])
        : fn(...prevArgs, ...currentArgs)
    }
  }
  return caller(fn.length, [])
}

export function compose<T = unknown, R = unknown>(
  ...fns: Array<(val: unknown) => any>
) {
  return (value: T): R => fns.reduceRight((val, fn) => fn(val), value)
}

export const trace = curry((tag: string, value: unknown) => {
  // tslint:disable-next-line:no-console
  console.log(tag, value)
  return value
})

export const defaultTo = curry((defaultValue: unknown, value: unknown) => {
  return value === undefined ? defaultValue : value
})

export const ternary = curry(
  (left: unknown, right: unknown, assert: unknown) => {
    return assert ? right : left
  },
)
