import { InitialOptionsTsJest } from "ts-jest/dist/types"
import { defaults as TsJestPreset } from "ts-jest/presets/index"
import { defaults as WebdriverIOPreset } from "../dist/jest-preset"

const configuration: InitialOptionsTsJest = {
  ...TsJestPreset,
  ...WebdriverIOPreset,
  rootDir: "../",
  globals: {
    webdriverio: {
      logLevel: "silent",
      capabilities: {
        // @ts-ignore this works
        browserName: "chrome",
        // @ts-ignore this works
        "goog:chromeOptions": { headless: true },
      },
      services: [`chromedriver`],
    },
    // ts-jest throws when globals is defined but there is not configuration
    "ts-jest": {},
  },
}

export default configuration
