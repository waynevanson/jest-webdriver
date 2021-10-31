import { Config } from "@jest/types"
import { defaults } from "ts-jest/presets"

const config: Config.InitialProjectOptions = {
  ...defaults,
  displayName: "chromedriver",
}

export default config
