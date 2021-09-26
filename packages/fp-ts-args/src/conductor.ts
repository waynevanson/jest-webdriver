import { reader as R } from "fp-ts"

export * from "fp-ts/Reader"

export interface Conductor<R, A> extends R.Reader<R, A> {}

// map, chain, compose, sum, ap, id
