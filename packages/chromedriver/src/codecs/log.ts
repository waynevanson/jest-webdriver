import { pipe } from "fp-ts/lib/function"
import { Encoder } from "./encoder"
import * as e from "io-ts/Encoder"
import * as d from "io-ts/Decoder"

import * as ee from "./encoder"
import * as dd from "./decoder"
import * as cc from "./codec"

const kebabCase = (string: string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()

export function kebab<A extends Record<string, unknown>>(
  fa: A,
): Record<string, A[keyof A]> {
  const result = {} as Record<string, A[keyof A]>

  for (const [name, value] of Object.entries(fa) as Array<
    [string, A[keyof A]]
  >) {
    result[kebabCase(name)] = value
  }

  return result
}

export type Options =
  | "replayable"
  | "readable"
  | "append-log"
  | "enable_chrome_logs"
  | "verbose"

export type Silent =
  | Partial<Record<Options, false>>
  | Record<"silent", true>
  | Partial<Record<"log-level", "OFF">>
  | Record<"verbose", true>

export type Verbose = Partial<
  Record<Options, boolean> & Record<"silent", false>
> &
  (Record<"log-level", "ALL"> | Record<"verbose", true>)

export const verboseFlag = pipe(
  d.union(
    dd.struct({ logLevel: dd.literal("ALL") }),
    dd.struct({ verbose: dd.truthy }),
  ),
  d.map(() => ({ verbose: true })),
)

// prettier-ignore
export type Rest =
  & Partial<Record<"log-level", "DEBUG" | "INFO" | "WARNING" | "SEVERE">>
  & Partial<Record<"silent" | "verbose", false>>

export const restLogLevel = pipe(
  dd.partial({ logLevel: dd.literal("DEBUG", "INFO", "WARNING", "SEVERE") }),
  d.map(kebab),
  cc.fromPartial,
)

export const restVerbosity = pipe(
  dd.partial({
    silent: dd.falsey,
    verbose: dd.falsey,
  }),
  cc.fromPartial,
)

export const rest = pipe(restLogLevel, cc.intersect(restVerbosity))
