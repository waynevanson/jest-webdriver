import { Config } from "@jest/types"
import * as path from "path"

// so we can reference ts files for testing
const ext = path.extname(__filename)

export const defaults: Pick<
  Config.InitialOptions,
  "testEnvironment" | "reporters"
> = {
  testEnvironment: path.resolve(__dirname, `./environment${ext}`),
  reporters: ["default", path.resolve(__dirname, `./reporter${ext}`)],
}
