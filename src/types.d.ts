import type { RemoteOptions } from "webdriverio"
declare module "@jest/types" {
  namespace Config {
    interface ConfigGlobals {
      webdriverio: WebdriverIOGlobalOptions
    }
  }
}

// Added so we can type check Jest types
//
// https://github.com/facebook/jest/issues/11640#issuecomment-893867514

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

type RequireKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

export type WebdriverIOExcludedProperties =
  | "runner"
  | "specs"
  | "exclude"
  | "include"
  | "suites"
  | "maxInstances"
  | "maxInstancesPerCapability"
  | "bail"
  | "specFileRetries"
  | "specFileRetriesDelay"
  | "specFileRetriesDeffered"
  | "framework"
  | "filesToWatch"
  | "cucumberFeaturesWithLineNumbers"
  | "watch"
  | "mochaOpts"
  | "jasmineOpts"
  | "cucumberOpts"
  | "autoCompileOpts"

export type RemoteOptionsJest = RequireKeys<
  Omit<RemoteOptions, WebdriverIOExcludedProperties>,
  "capabilities"
>

export type MultiRemoteOptionsJest = [RemoteOptionsJest, ...RemoteOptionsJest[]]

// todo - add multiremote
export type WebdriverIOGlobalOptions = RemoteOptionsJest
// | MultiRemoteOptionsJest
