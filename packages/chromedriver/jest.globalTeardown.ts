import { Config } from "@jest/types"
import { stop } from "./src/index"

export default async function globalSetup(config: Config.GlobalConfig) {
  // start chromedrier
  stop()
}
