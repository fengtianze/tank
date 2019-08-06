const curry = fn => {
  const caller = (restLength, prevArgs) => {
    return (...currentArgs) => {
      return currentArgs.length < restLength
        ? caller(restLength - currentArgs.length, [...prevArgs, ...currentArgs])
        : fn(...prevArgs, ...currentArgs)
    }
  }
  return caller(fn.length, [])
}

const compose = (...fns) => {
  return value => fns.reduceRight((val, fn) => fn(val), value)
}

const trace = curry((tag, value) => {
  // eslint-disable-next-line no-console
  console.log(tag, value)
  return value
})

const defaultTo = curry((defaultValue, value) => {
  return value === undefined ? defaultValue : value
})

const ternary = curry((left, right, assert) => {
  return assert ? right : left
})

const bind = fn => {
  return (...args) => {
    return (...restArgs) => {
      return fn.call(...args, ...restArgs)
    }
  }
}

module.exports = {
  curry,
  compose,
  trace,
  defaultTo,
  ternary,
  bind,
}
