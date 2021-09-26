// two encoders, but I wouldn't mind using map.
//

import { reader as R } from "fp-ts"

// sum, intersection

export interface Configuration<I, O, A> {
  readonly composer: (r: I) => A
  readonly conductor: (a: A) => O
}

export type InputOf<T> = T extends Configuration<infer I, any, any> ? I : never

export type OutputOf<T> = T extends Configuration<any, infer O, any> ? O : never

export type TypeOf<T> = T extends Configuration<any, any, infer A> ? A : never

export function make<O, A>(conductor: R.Reader<A, O>) {
  return <I>(composer: R.Reader<I, A>): Configuration<I, O, A> => ({
    composer,
    conductor,
  })
}

export function summarize<S extends string>(sum: S) {
  return <T extends Record<string, Configuration<any, any, any>>>(
    sums: T,
  ): Configuration<
    { [P in keyof T]: InputOf<T[P]> }[keyof T],
    { [P in keyof T]: OutputOf<T[P]> }[keyof T],
    { [P in keyof T]: TypeOf<T[P]> & { [Q in S]: P } }[keyof T]
  > => {
    return
  }
}

const names = make(({}: { name: string }) => {})((name: string) => ({
  name,
}))

const ages = make(({}: { age: number }) => {})((age: number) => ({
  age,
}))

const result = summarize("_tag")({
  names,
  ages,
})
