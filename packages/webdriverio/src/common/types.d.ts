import type { RemoteOptions } from "webdriverio"
import type { RequireKeys } from "../../../common/src"

declare module "@jest/types" {
  namespace Config {
    interface ConfigGlobals {
      webdriverio: WebdriverIOGlobalOptions
    }
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

export type RemoteOptionsJest = RequireKeys<
  Omit<RemoteOptions, WebdriverIOExcludedProperties>,
  "capabilities"
>

export type WebdriverIOGlobalOptions = RemoteOptionsJest
