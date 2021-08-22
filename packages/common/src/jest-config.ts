import { Config } from "@jest/types"
import { defaults } from "jest-config"

export const custom_defaults: Config.ProjectConfig = {
  ...defaults,
  cwd: "",
  extraGlobals: [],
  name: "",
  rootDir: "",
  transform: [],
  moduleNameMapper: [],
}
