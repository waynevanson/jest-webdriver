import { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  projects: [
    "<rootDir>/packages/webdriver/jest.config.ts",
    "<rootDir>/packages/chromedriver/jest.config.ts",
  ],
}

export default config
