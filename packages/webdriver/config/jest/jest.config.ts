import { Config } from "@jest/types"
import * as path from "path"
import { defaults } from "ts-jest/presets"

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
      rootDir: path.resolve(__dirname, "../../"),
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
      globalSetup: path.resolve(__dirname, "./setup.ts"),
      globalTeardown: path.resolve(__dirname, "./teardown.ts"),
    },
  ],
}

export default config
