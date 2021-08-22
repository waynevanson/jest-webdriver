import { Config } from "@jest/types"
import { defaults } from "ts-jest/presets"
import * as path from "path"

const config: Config.InitialOptions = {
  projects: [
    {
      displayName: "unit",
      ...defaults,
      testEnvironment: "node",
      testMatch: ["<rootDir>/tests/unit.spec.ts"],
    },
    {
      displayName: "webdriver",
      ...defaults,
      testEnvironment: path.resolve(__dirname, "./src/index.ts"),
      testMatch: ["<rootDir>/tests/webdriver.spec.ts"],
      globals: { "ts-jest": {}, webdriver: { options: { capabilities: {} } } },
      globalSetup: path.resolve(__dirname, "./jest/setup.ts"),
      globalTeardown: path.resolve(__dirname, "./jest/teardown.ts"),
    },
  ],
}

export default config
