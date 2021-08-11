import { Config } from "@jest/types"
import * as path from "path"

const testEnvironment = path.resolve(__dirname, "./environment.js")

export const defaults: Pick<Config.InitialOptions, "testEnvironment"> = {
  testEnvironment,
}
