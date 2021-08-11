import { InitialOptionsTsJest } from "ts-jest/dist/types"
import { defaults as TsJestPreset } from "ts-jest/presets/index"
import { defaults as WebdriverIOPreset } from "../dist/jest-preset"

const projectDefaults = {
  rootDir: "./",
}

export default {
  ...TsJestPreset,
  ...WebdriverIOPreset,
  rootDir: "../",
  globals: { webdriverio: {}, "ts-jest": {} },
  // projects: [
  //   {
  //     ...projectDefaults,
  //     displayName: "test",
  //   },
  //   {
  //     ...projectDefaults,
  //     displayName: "lint",
  //     testMatch: ["./src/**/*.ts"],
  //     runner: "jest-runner-eslint",
  //   },
  // ],
  // watchPlugins: ["jest-runner-eslint/watch-fix"],
} as InitialOptionsTsJest
