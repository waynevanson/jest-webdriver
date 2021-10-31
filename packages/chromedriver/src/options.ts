import { option as O, readonlyArray as A } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"

export type LogLevel = "ALL" | "DEBUG" | "INFO" | "WARNING" | "SEVERE" | "OFF"

export const asTrue: d.Decoder<true, true> = d.literal(true)
export const asNumber: d.Decoder<number, number> = d.number
export const asString: d.Decoder<string, string> = d.string

export function fromPartialNullable<K extends string>(property: K) {
  return <A>(
    decoder: d.Decoder<A, A>
  ): d.Decoder<Partial<Record<K, A>>, NonNullable<A>> =>
    pipe(
      d.fromPartial({ [property]: decoder }),
      d.map(O.fromNullableK((partial) => partial[property])),
      d.refine(O.isSome, "Some"),
      d.map((a) => a.value)
    )
}

const fromPartialFlag = <K extends string>(property: K) =>
  fromPartialNullable(property)(asTrue)

export const silent: d.Decoder<Partial<Record<"silent", true>>, string> = pipe(
  fromPartialFlag("silent"),
  d.map(() => "--silent")
)

// export const verbose: d.Decoder<
//   Partial<Record<"verbose", true>>,
//   string
// > = pipe(
//   fromPartialFlag("verbose"),
//   d.map(() => "--verbose")
// )

// export const logLevel: d.Decoder<
//   Record<"logLevel", LogLevel>,
//   O.Option<string>
// > = pipe(
//   d.literal("ALL", "DEBUG", "INFO", "WARNING", "SEVERE", "OFF"),
//   fromPartialNullable("logLevel"),
//   d.map(O.map((logLevel) => `--log-level="${logLevel}"`))
// )

// export const enableChromeLogs: d.Decoder<
//   Partial<Record<"enableChromeLogs", true>>,
//   O.Option<string>
// > = pipe(
//   fromPartialFlag("enableChromeLogs"),
//   d.map(O.map(() => `--enable-chrome-logs`))
// )

export const port = pipe(
  asNumber,
  fromPartialNullable("port"),
  d.map((port) => `--port="${port}"`)
)

// export const adbPort = pipe(
//   asNumber,
//   fromPartialNullable("port"),
//   d.map(O.map((adbPort) => `--adb-port="${adbPort}"`))
// )

// export const logPath = pipe(
//   asString,
//   fromPartialNullable("logPath"),
//   d.map(O.map((logPath) => `--log-path="${logPath}"`))
// )

// export const allowed = pipe(
//   [
//     ["allowedIps", "--allowed-ips"],
//     ["allowedOrigins", "--allowed-origins"],
//   ] as const,
//   A.reduce(
//     pipe(
//       d.id<Partial<Record<"allowedOrigins" | "allowedIps", Array<string>>>>()
//     ),
//     (b, [property, flag]) =>
//       pipe(
//         d.fromArray(asString),
//         fromPartialNullable(property),
//         d.map(O.map((alloweds) => alloweds.join(","))),
//         d.map(O.map((alloweds) => `${flag}="${alloweds}"`)),
//         d.intersect(b)
//       )
//   )
// )

// const flags = pipe(
//   [
//     ["appendLog", "--append-log"],
//     ["replayable", "--replayable"],
//     ["readableTimestamp", "readable-timestampe"],
//     ["disableDevShmUsage", "--disable-dev-shm-usage"],
//   ] as const,
//   A.reduce(
//     d.id<
//       Partial<
//         Record<
//           | "appendLog"
//           | "replayable"
//           | "readableTimestamp"
//           | "disableDevShmUsage",
//           true
//         >
//       >
//     >(),
//     (b, [property, flag]) =>
//       pipe(
//         fromPartialFlag(property),
//         d.map(O.map(() => flag as string)),
//         d.intersect(b)
//       )
//   )
// )

export const logging = d.union(silent)

// export const options = pipe(
//   logging,
//   d.intersect(port),
//   d.intersect(adbPort),
//   d.intersect(logPath)
//   // d.intersect(flags),
//   // d.intersect(allowed),
// )

// const version = pipe(
//   fromPartialFlag("version"),
//   d.map(O.map(() => `--version`))
// )

// export const decoder = pipe(
//   d.union(options, version),
//   d.map(O.fold(() => A.zero<string>(), A.of))
// )

// export type ChromeDriverOptions = d.InputOf<typeof options>

// export interface _ChromeDriverOptions {
//   port?: number
//   adbPort?: number
//   logPath?: string

//   enableChromeLogs?: boolean
//   logLevel?: LogLevel
//   verbose?: boolean
//   silent?: boolean

//   appendLog?: boolean
//   replayable?: boolean
//   version?: true
//   readableTimestamp?: boolean
//   disableDevShmUsage?: boolean
//   urlBase?: string
//   allowedIps?: Array<string>
//   allowedOrigin?: Array<string>
// }
