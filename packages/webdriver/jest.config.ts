import { Config } from "@jest/types"
import { defaults } from "ts-jest/presets"
import * as path from "path"

const config: Config.InitialOptions = {
  projects: [
    // {
    //   displayName: "unit",
    //   ...defaults,
    //   testEnvironment: "node",
    //   testMatch: ["<rootDir>/tests/unit.spec.ts"],
    // },
    {
      displayName: "webdriver",
      ...defaults,
      testMatch: ["<rootDir>/tests/webdriver.spec.ts"],
      globals: {
        "ts-jest": {},
        webdriver: {
          options: {
            capabilities: {
              browserName: "chrome",
              "goog:chromeOptions": {
                args: ["headless"],
              },
            },
            logLevel: "silent",
            port: 4098,
          },
        },
        chromedriver: {
          options: {
            port: 4098,
            headless: true,
          },
        },
      },
      testEnvironment: "<rootDir>/src/environment.ts",
      globalSetup: path.resolve(__dirname, "./jest/setup.ts"),
      globalTeardown: path.resolve(__dirname, "./jest/teardown.ts"),
    },
  ],
}

export default config
