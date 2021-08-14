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
