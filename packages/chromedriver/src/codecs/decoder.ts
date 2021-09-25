import * as d from "io-ts/Decoder"
import { Literal } from "io-ts/Schemable"

export * from "io-ts/Decoder"

export interface Decoder<A> extends d.Decoder<A, A> {}

export function fromLiteral<T extends readonly [Literal, ...Literal[]]>(
  ...literals: T
): Decoder<T[number]> {
  return d.literal(...literals)
}

export const fromFalse = fromLiteral(false)
export const fromTrue = fromLiteral(true)
export const fromString: Decoder<string> = d.string
export const fromNumber: Decoder<number> = d.number
export const fromBoolean: Decoder<boolean> = d.boolean

export function fromNullable<A>(fa: Decoder<A>): Decoder<null | A> {
  return d.nullable(fa)
}

export function fromArrayExact<A>(fa: Decoder<A>): Decoder<Array<A>> {
  return d.fromArray(fa)
}

export function fromStructExact<A extends Record<string, any>>(
  fa: { [P in keyof A]: Decoder<A[P]> },
): Decoder<A> {
  return d.fromStruct(fa)
}

// @todo – Widen I
export function fromPartialExact<A extends Record<string, any>>(
  fa: { [P in keyof A]: Decoder<A[P]> },
): Decoder<Partial<A>> {
  return d.fromPartial(fa)
}

export function fromTupleExact<A extends readonly unknown[]>(
  ...args: { [P in keyof A]: Decoder<A[P]> }
): Decoder<A> {
  return d.tuple(...args) as any
}
