import { pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import { kebabKeys } from "../../kebab-case"
import * as cc from "../codec"
import * as dd from "../decoder"
import * as c from "io-ts/Codec"

export const options = pipe(
  dd.fromPartialExact({
    replayable: dd.fromFalse,
    readable: dd.fromFalse,
    appendLog: dd.fromFalse,
    verbose: dd.fromFalse,
  }),
  d.map(kebabKeys),
  cc.fromPartial,
)

export const requireds = pipe(
  d.union(
    dd.fromStructExact({ silent: dd.fromTrue }),
    dd.fromStructExact({ logLevel: dd.fromLiteral("OFF") }),
  ),
  d.map(() => ({ silent: true as const })),
  cc.fromRecord,
)

export const silent = pipe(options, cc.intersect(requireds))
