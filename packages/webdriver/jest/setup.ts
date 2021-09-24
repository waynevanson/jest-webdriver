import { setup } from "../../chromedriver/src"
import { Config } from "@jest/types"

// @todo –  use the global config option to get the options
export default async function (_: Config.GlobalConfig) {
  await setup({ port: 4098, silent: true })
}
