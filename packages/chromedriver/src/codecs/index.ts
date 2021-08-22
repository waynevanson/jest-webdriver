import { option as O, readonlyArray as A, record as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as e from "io-ts/Encoder"
export * from "./logging"
import { log, _false, _true } from "./logging"

export const driver_options = c.make(
  pipe(
    d.partial({
      port: d.number,
      adb_port: d.number,
      url_base: d.string,
      // @todo - non-empty-array
      allowed_ips: d.array(d.string),
    }),
  ),
  {
    encode: ({ adb_port, allowed_ips, port, url_base }) =>
      A.compact([
        pipe(
          port,
          O.fromNullable,
          O.map((port) => `--port=${port}`),
        ),
        pipe(
          adb_port,
          O.fromNullable,
          O.map((port) => `--adb-port=${port}`),
        ),
        pipe(
          allowed_ips,
          O.fromNullable,
          O.chain(O.fromPredicate(A.isNonEmpty)),
          O.map((ips) => ips.join(",")),
          O.map((ips) => `--allowed-ips=${ips}`),
        ),
        pipe(
          url_base,
          O.fromNullable,
          O.map((url) => `--url-base=${url}`),
        ),
      ]),
  },
)

export const options = c.make(pipe(driver_options, c.intersect(log)), {
  encode: ({ adb_port, allowed_ips, port, url_base, ...rest }) =>
    pipe(
      log.encode(rest),
      A.alt(() =>
        driver_options.encode({ adb_port, allowed_ips, port, url_base }),
      ),
    ),
})
