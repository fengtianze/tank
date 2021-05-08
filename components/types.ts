export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Merge<T, K> = Pick<T, Exclude<keyof T, keyof K>> & K;

export type TKProps<T, K> = Readonly<Partial<Merge<T, K>>>;
