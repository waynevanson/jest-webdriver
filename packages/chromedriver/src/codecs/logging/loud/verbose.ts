import { pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import * as c from "io-ts/Codec"
import * as cc from "../../codec"
import * as dd from "../../decoder"

export const verbose = pipe(
  dd.union(
    dd.fromStructExact({ logLevel: dd.fromLiteral("ALL") }),
    dd.fromStructExact({ verbose: dd.fromTrue }),
  ),
  dd.intersect(dd.fromPartialExact({ silent: dd.fromFalse })),
  d.map(() => ({
    verbose: true as const,
  })),
  cc.fromRecord,
)
