import { pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import * as e from "io-ts/Encoder"
import { Literal } from "io-ts/Schemable"

export interface Decoder<A> extends d.Decoder<A, A> {}

export function literal<T extends readonly [Literal, ...Literal[]]>(
  ...literals: T
): Decoder<T[number]> {
  return d.literal(...literals)
}

export const falsey = literal(false)
export const truthy = literal(true)
export const string: Decoder<string> = d.string
export const number: Decoder<number> = d.number
export const boolean: Decoder<boolean> = d.boolean

export function nullable<A>(fa: Decoder<A>): Decoder<null | A> {
  return d.nullable(fa)
}

export function array<A>(fa: Decoder<A>): Decoder<Array<A>> {
  return d.fromArray(fa)
}

export function struct<A extends Record<string, any>>(
  fa: { [P in keyof A]: Decoder<A[P]> },
): Decoder<A> {
  return d.fromStruct(fa)
}

export function partial<A extends Record<string, any>>(
  fa: { [P in keyof A]: Decoder<A[P]> },
): Decoder<Partial<A>> {
  return d.fromPartial(fa)
}

export function tuple<A extends readonly unknown[]>(
  ...args: { [P in keyof A]: Decoder<A[P]> }
) {
  return d.tuple(...args)
}
