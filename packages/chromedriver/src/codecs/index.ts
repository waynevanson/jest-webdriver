import { pipe } from "fp-ts/lib/function"
import { kebabKeys } from "../kebab-case"
import * as cc from "./codec"
import * as dd from "./decoder"
import { logging } from "./logging"

export const driverOptions = pipe(
  dd.fromPartialExact({
    port: dd.fromNumber,
    adbPort: dd.fromNumber,
    urlBase: dd.fromString,
    // @todo – non empty array
    // coerce ips to something else
    // join with ','
    // allowedIps: pipe(
    //   dd.fromArrayExact(dd.fromString),
    //   dd.map((allowedIps) => allowedIps.join(",")),
    // ),
  }),
  dd.map(kebabKeys),
  cc.fromPartial,
)

export const all = pipe(driverOptions, cc.intersect(logging))
