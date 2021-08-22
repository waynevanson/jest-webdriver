import { Config } from "@jest/types"
import { defaults } from "ts-jest/presets"
import * as path from "path"

const config: Config.InitialOptions = {
  projects: [
    {
      displayName: "unit",
      ...defaults,
      testEnvironment: "node",
    },
    {
      displayName: "webdriver",
      ...defaults,
      testEnvironment: path.resolve(__dirname, "./src/index.ts"),
    },
  ],
}

export default config
