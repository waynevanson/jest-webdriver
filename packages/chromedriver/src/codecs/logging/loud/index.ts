import { pipe } from "fp-ts/lib/function"
import { kebabKeys } from "../../../kebab-case"
import * as dd from "../../decoder"
import * as cc from "../../codec"
import { base } from "./base"
import { verbose } from "./verbose"
import * as c from "io-ts/Codec"

export const options = pipe(
  dd.fromPartialExact({
    replayable: dd.fromBoolean,
    readable: dd.fromBoolean,
    appendLog: dd.fromBoolean,
  }),
  dd.map(kebabKeys),
  cc.fromPartial,
)

export const loud = pipe(
  c.fromSum("_loud")({
    base: pipe(
      base,
      c.imap(
        (props) => ({ ...props, _loud: "base" as const }),
        ({ _loud, ...rest }) => rest,
      ),
    ),
    verbose: pipe(
      verbose,
      c.imap(
        (props) => ({ ...props, _loud: "verbose" as const }),
        ({ _loud, ...props }) => props,
      ),
    ),
  }),
  cc.intersect(options),
)
