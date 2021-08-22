import { option as O } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as o from "monocle-ts/Optional"
export * from "monocle-ts/Optional"

export const partial =
  <A, P extends keyof A>(prop: P) =>
  <S>(optional: o.Optional<S, A>): o.Optional<S, NonNullable<A[P]>> => ({
    getOption: pipe(optional, o.prop(prop), o.fromNullable).getOption,
    set: (b) => (s) =>
      pipe(
        optional.getOption(s),
        O.fold(
          () => ({} as A),
          (a) => a,
        ),
        (a) => Object.assign({}, a, { [prop]: b }),
        optional.set,
      )(s),
  })
