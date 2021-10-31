import { Config } from "@jest/types"
import { start } from "./src/index"

export default async function globalSetup(config: Config.GlobalConfig) {
  // start chromedrier
  await start({ silent: true, port: 6666 })
}
