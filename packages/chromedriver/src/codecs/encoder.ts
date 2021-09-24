import * as e from "io-ts/Encoder"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import { pipe } from "fp-ts/lib/function"
import { option as O, readonlyArray as A } from "fp-ts"
import { Literal } from "io-ts/Schemable"

export type Arguable = ReadonlyArray<O.Option<string>>

export interface Encoder<A> extends e.Encoder<Arguable, A> {}

export type Sum<K extends string, A extends Record<string, unknown>> = {
  _tag: K
  value: A
}

export function fromRecord<A extends Record<string, Literal>>(): Encoder<A> {
  return pipe(
    e.id<Arguable>(),
    e.contramap((fa) =>
      pipe(
        Object.entries(fa),
        A.map(([name, literal]) => {
          switch (literal) {
            case true: {
              return O.some(`--${name}`)
            }
            case false: {
              return O.none
            }
            default: {
              return O.some(`--${name}=${literal}`)
            }
          }
        }),
      ),
    ),
  )
}

export function fromPartial<
  A extends Partial<Record<string, Literal>>,
>(): Encoder<A> {
  return pipe(
    e.id<Arguable>(),
    e.contramap((fa) =>
      pipe(
        Object.entries(fa),
        A.filterMap(([name, literal]) =>
          pipe(
            literal,
            O.fromNullable,
            O.map((literal) => [name, literal] as const),
          ),
        ),
        A.map(([name, literal]) => {
          switch (literal) {
            case true: {
              return O.some(`--${name}`)
            }
            case false: {
              return O.none
            }
            default: {
              return O.some(`--${name}=${literal}`)
            }
          }
        }),
      ),
    ),
  )
}
