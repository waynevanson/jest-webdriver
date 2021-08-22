/// <reference types="node" />

declare global {
  // Added so we can type check Jest types
  //
  // https://github.com/facebook/jest/issues/11640#issuecomment-893867514
  namespace NodeJS {
    // eslint-disable-next-line
    interface Global {}
    // eslint-disable-next-line
    interface InspectOptions {}

    // eslint-disable-next-line
    interface ConsoleConstructor extends console.ConsoleConstructor {}
  }

  // strictly typed isArray
  interface ArrayConstructor {
    isArray<T>(
      value: T,
    ): value is Extract<T, Array<unknown> | ReadonlyArray<unknown>>
  }

  interface ObjectConstructor {
    assign<T extends readonly Record<string, unknown>[]>(
      ...args: T
    ): T extends readonly (infer U)[]
      ? U extends any
        ? (r: U) => void extends (r: infer I) => void ? I : never
        : never
      : never
  }
}

export type RequireKeys<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

export * as optional from "./optional"
