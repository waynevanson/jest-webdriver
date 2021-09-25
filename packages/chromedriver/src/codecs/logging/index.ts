import { loud } from "./loud"
import { silent } from "./silent"
import * as c from "io-ts/Codec"
import { pipe } from "fp-ts/lib/function"

export const logging = c.fromSum("_logging")({
  loud: pipe(
    loud,
    c.imap(
      (props) => ({ ...props, _logging: "loud" as const }),
      ({ _logging, ...rest }) => rest,
    ),
  ),
  silent: pipe(
    silent,
    c.imap(
      (props) => ({ ...props, _logging: "silent" as const }),
      ({ _logging, ...rest }) => rest,
    ),
  ),
})
