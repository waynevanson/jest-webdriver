import { ChromeDriverOptions } from "./options"

declare module "@jest/types" {
  namespace Config {
    interface ConfigGlobals {
      readonly chromedriver: {
        options: ChromeDriverOptions
      }
    }
  }
}
