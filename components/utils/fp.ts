export function curry(fn: (...args: any[]) => any) {
  const caller = (restLength: number, prevArgs: any[]) => {
    return (...currentArgs: any[]) => {
      return currentArgs.length < restLength
        ? caller(restLength - currentArgs.length, [...prevArgs, ...currentArgs])
        : fn(...prevArgs, ...currentArgs);
    };
  };
  return caller(fn.length, []);
}

export function compose<T = any, R = any>(...fns: ((val: any) => any)[]) {
  return (value: T): R => fns.reduceRight((val, fn) => fn(val), value);
}

export const trace = curry((tag: string, value: any) => {
  // eslint-disable-next-line no-console
  console.log(tag, value);
  return value;
});

export const defaultTo = curry((defaultValue: any, value: any) => {
  return value === undefined ? defaultValue : value;
});

export const ternary = curry((left: any, right: any, assert: any) => {
  return assert ? right : left;
});
