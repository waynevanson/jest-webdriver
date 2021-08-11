declare module "@jest/types" {
  namespace Config {
    interface ConfigGlobals {
      webdriverio: WebdriverIOConfigOptionsJest
    }
  }
}

// Added so we can type check Jest types
//
// https://github.com/facebook/jest/issues/11640#issuecomment-893867514
declare global {
  namespace NodeJS {
    interface Global {}
    interface InspectOptions {}

    interface ConsoleConstructor
      extends console.ConsoleConstructor {}
  }
}

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

export interface WebdriverIOConfigOptionsJest
  extends Omit<
    WebdriverIO.Config,
    WebdriverIOExcludedProperties
  > {}
