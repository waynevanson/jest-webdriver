import * as chromedriver from "chromedriver"
import { options } from "./codecs"
import * as c from "io-ts/Codec"
import { either, readonlyArray } from "fp-ts"
import * as d from "io-ts/Decoder"

export async function setup(props: c.InputOf<typeof options>) {
  const result = options.decode(props)

  if (either.isLeft(result)) {
    throw new Error(d.draw(result.left))
  }

  const encoded = readonlyArray.compact(options.encode(result.right))

  await chromedriver.start(encoded, true)
}

export async function teardown() {
  chromedriver.stop()
}
