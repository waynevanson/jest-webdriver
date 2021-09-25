import { pipe } from "fp-ts/lib/function"
import * as dd from "../../decoder"
import * as cc from "../../codec"
import * as d from "io-ts/Decoder"
import { kebabKeys } from "../../../kebab-case"
import * as c from "io-ts/Codec"

export const base = pipe(
  dd.fromPartialExact({
    logLevel: dd.fromLiteral("DEBUG", "INFO", "WARNING", "SEVERE"),
  }),
  d.intersect(
    pipe(
      dd.fromPartialExact({ verbose: dd.fromFalse, silent: dd.fromFalse }),
      d.map(() => ({})),
    ),
  ),
  d.map(kebabKeys),
  cc.fromRecord,
)
