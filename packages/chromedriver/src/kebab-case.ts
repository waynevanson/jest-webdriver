import { Any } from "ts-toolbelt"
//@todo - fix so we can enable strings longer than 11 chars
export type KebabCase<S> = S extends `${infer C}${infer T}`
  ? KebabCase<T> extends infer U
    ? U extends string
      ? T extends Uncapitalize<T>
        ? `${Uncapitalize<C>}${U}`
        : `${Uncapitalize<C>}-${U}`
      : never
    : never
  : S

const kebabCase = <K extends string>(string: K): KebabCase<K> =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase() as KebabCase<K>

export type KebabKeys<A> = {
  [P in keyof A as KebabCase<P>]: A[P]
}

export function kebabKeys<A extends Record<string, unknown>>(
  fa: A,
): Any.Compute<KebabKeys<A>> {
  const result = {} as any

  for (const [name, value] of Object.entries(fa) as Array<
    [string, A[keyof A]]
  >) {
    result[kebabCase(name)] = value
  }

  return result
}
