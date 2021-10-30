import {} from "chromedriver"
import { option as O, readonlyArray as A } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"

export type LogLevel = "ALL" | "DEBUG" | "INFO" | "WARNING" | "SEVERE" | "OFF"

export const silent: d.Decoder<
  Partial<Record<"silent", true>>,
  O.Option<string>
> = pipe(
  d.fromPartial({ silent: d.literal(true) }),
  d.map(
    flow(
      O.fromNullableK(({ silent }) => silent),
      O.map(() => "--silent")
    )
  )
)

export const verbose: d.Decoder<
  Partial<Record<"verbose", true>>,
  O.Option<string>
> = pipe(
  d.fromPartial({ verbose: d.literal(true) as d.Decoder<true, true> }),
  d.map(
    flow(
      O.fromNullableK(({ verbose }) => verbose),
      O.map(() => "--verbose")
    )
  )
)

export const logLevel: d.Decoder<
  Record<"logLevel", LogLevel>,
  O.Option<string>
> = pipe(
  d.fromPartial({
    logLevel: d.literal("ALL", "DEBUG", "INFO", "WARNING", "SEVERE", "OFF"),
  }),
  d.map(
    flow(
      O.fromNullableK(({ logLevel }) => logLevel),
      O.map((logLevel) => `--log-level="${logLevel}"`)
    )
  )
)

export const logging = d.union(silent, verbose, logLevel)

export const port = pipe(
  d.fromPartial({ port: d.id<number>() }),
  d.map(O.fromNullableK(({ port }) => port)),
  d.map(O.map((port) => `--port="${port}"`))
)

export const adbPort = pipe(
  d.fromPartial({ adbPort: d.id<number>() }),
  d.map(O.fromNullableK(({ adbPort }) => adbPort)),
  d.map(O.map((adbPort) => `--adb-port="${adbPort}"`))
)

export const logPath = pipe(
  d.fromPartial({ logPath: d.string }),
  d.map(O.fromNullableK(({ logPath }) => logPath)),
  d.map(O.map((logPath) => `--log-path="${logPath}"`))
)

export const options = pipe(
  logging,
  d.intersect(port),
  d.intersect(adbPort),
  d.intersect(logPath),
  d.map(O.foldW(() => A.empty, A.of))
)

export interface ChromeDriverOptions {
  port?: number
  adbPort?: number
  logPath?: string
  logLevel?: LogLevel
  verbose?: boolean
  silent?: boolean
  appendLog?: boolean
  replayable?: boolean
  version?: true
  readableTimestamp?: boolean
  urlBase?: string
  enableChromeLogs?: boolean
  disableDevShmUsage?: boolean
  allowedIps?: Array<string>
  allowedOrigin?: Array<string>
}
