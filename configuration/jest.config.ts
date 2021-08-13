import { InitialOptionsTsJest } from "ts-jest/dist/types"
import { defaults as TsJestPreset } from "ts-jest/presets/index"
import { defaults as WebdriverIOPreset } from "../dist/jest-preset"

const configuration: InitialOptionsTsJest = {
  ...TsJestPreset,
  ...WebdriverIOPreset,
  rootDir: "../",
  globals: {
    webdriverio: {
      capabilities: {},
    },
    "ts-jest": {},
  },
}

export default configuration
