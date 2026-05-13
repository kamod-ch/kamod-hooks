/** Mirrors common React hook-related types for Preact ports. */
export type DependencyList = readonly unknown[];

export type EffectCallback = () => void | (() => void);

export type SetStateAction<S> = S | ((prevState: S) => S);

export type Dispatch<A> = (value: A) => void;
