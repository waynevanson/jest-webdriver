// Added so we can type check Jest types
//
// https://github.com/facebook/jest/issues/11640#issuecomment-893867514

/// <reference types="node" />

declare global {
  namespace NodeJS {
    // eslint-disable-next-line
    interface Global {}
    // eslint-disable-next-line
    interface InspectOptions {}

    // eslint-disable-next-line
    interface ConsoleConstructor extends console.ConsoleConstructor {}
  }

  interface ArrayConstructor {
    isArray<T>(
      value: T,
    ): value is Extract<T, Array<unknown> | ReadonlyArray<unknown>>
  }
}

export type RequireKeys<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>
