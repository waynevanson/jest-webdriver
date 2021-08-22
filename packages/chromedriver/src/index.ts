import * as chromedriver from "chromedriver"
import { options } from "./codecs"
import * as e from "io-ts/Encoder"

export async function setup(props: e.TypeOf<typeof options>) {
  await chromedriver.start(options.encode(props), true)
}

export async function teardown() {
  chromedriver.stop()
}
