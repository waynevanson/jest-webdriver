import { InitialOptionsTsJest } from "ts-jest/dist/types"
import { register } from "ts-node"
import { defaults as WebdriverIOPreset } from "../src/jest-preset"

register()

const configuration: InitialOptionsTsJest = {
  ...WebdriverIOPreset,
  rootDir: "../",
  globals: {
    webdriverio: {
      logLevel: "silent",
      capabilities: {
        browserName: "chrome",
        "goog:chromeOptions": { headless: true },
      },
      services: [`chromedriver`],
    },
    // ts-jest throws when globals is defined but there is not configuration
    "ts-jest": {},
  },
}

export default configuration
