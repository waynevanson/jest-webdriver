import * as e from "io-ts/Encoder"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as FS from "io-ts/FreeSemigroup"
import * as DE from "io-ts/DecodeError"

import { pipe, identity, flow, tuple } from "fp-ts/lib/function"
import { these as TH, either as E, readonlyArray as A } from "fp-ts"
import { Literal } from "io-ts/Schemable"

import * as ee from "./encoder"
import * as dd from "./decoder"
import { UnionToIntersection } from "../utils"
import { CallChain } from "typescript"

export interface Codec<R, A> extends c.Codec<R, ee.Arguable, A> {}

export function fromEncoder<A>(fa: ee.Encoder<A>): Codec<A, A> {
  return c.make({ decode: E.right }, fa)
}

export function make<R, A>(
  decoder: d.Decoder<R, A>,
  encoder: ee.Encoder<A>,
): Codec<R, A> {
  return c.make(decoder, encoder)
}

export function intersect<R, A>(right: Codec<R, A>) {
  return <Q, B>(left: Codec<Q, B>): Codec<R & Q, A & B> =>
    pipe(right, c.intersect(left))
}

export function fromRecord<I, A extends Record<string, Literal>>(
  fa: d.Decoder<I, A>,
): Codec<I, A> {
  return make(fa, ee.fromRecord())
}

export function fromPartial<I, A extends Record<string, Literal>>(
  fa: d.Decoder<I, Partial<A>>,
): Codec<I, Partial<A>> {
  return make(fa, ee.fromPartial())
}
