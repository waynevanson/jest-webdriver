import * as chromedriver from "chromedriver"
import { options } from "./codecs"
import * as c from "io-ts/Codec"
export async function setup(props: c.InputOf<typeof options>) {
  // @ts-expect-error
  await chromedriver.start(options.encode(props), true)
}

export async function teardown() {
  chromedriver.stop()
}
