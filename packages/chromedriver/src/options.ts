import {
  either as E,
  option as O,
  readonlyArray as A,
  readerEither as RE,
} from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import { Semigroup } from "fp-ts/lib/Semigroup"
import * as d from "io-ts/Decoder"

export type LogLevel = "ALL" | "DEBUG" | "INFO" | "WARNING" | "SEVERE" | "OFF"

export const asTrue: d.Decoder<true, true> = d.literal(true)
export const asNumber: d.Decoder<number, number> = d.number
export const asString: d.Decoder<string, string> = d.string

const arrayFromOption = <A>(fa: O.Option<A>) =>
  pipe(
    fa,
    O.fold(() => A.zero<A>(), A.of)
  )

export function fromPartialNullable<K extends string>(property: K) {
  return <I, A>(
    decoder: d.Decoder<I, A>
  ): d.Decoder<Partial<Record<K, I>>, O.Option<A>> =>
    pipe(
      d.fromPartial({ [property]: decoder }),
      d.map(O.fromNullableK((partial) => partial[property]))
    )
}

const fromPartialFlag = <K extends string>(property: K) =>
  fromPartialNullable(property)(asTrue)

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
  d.map(O.map((port) => `--port=${port}`)),
  d.map(arrayFromOption)
)

export const adbPort = pipe(
  asNumber,
  fromPartialNullable("adbport"),
  d.map(O.map((adbPort) => `--adb-port=${adbPort}`)),
  d.map(arrayFromOption)
)

export const logPath = pipe(
  asString,
  fromPartialNullable("logPath"),
  d.map(O.map((logPath) => `--log-path="${logPath}"`)),
  d.map(arrayFromOption)
)

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

const truthy = pipe(d.id<true>(), d.compose(d.literal(true)))

export const logging = pipe(
  d.union(
    pipe(
      d.fromStruct({ silent: truthy }),
      d.intersect(d.fromPartial({ verbose: d.id<false>() })),
      d.map(() => `--silent`)
    ),
    pipe(
      d.fromStruct({ verbose: truthy }),
      d.intersect(d.fromPartial({ silent: d.id<false>() })),
      d.map(() => `--verbose`)
    )
  ),
  d.map(A.of)
)

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

const aaa = intersectionSemigroup(A.getMonoid<string>())

export const decoder = pipe(
  logging,
  fromPartialNullable("logging"),
  d.map(O.sequence(A.Applicative)),
  d.map(A.compact),
  aaa(port)
  // aaa(adbPort),
  // aaa(logPath)
)

export function intersectionSemigroup<A>(semigroup: Semigroup<A>) {
  return <IA>(fa: d.Decoder<IA, A>) =>
    <IB>(fb: d.Decoder<IB, A>): d.Decoder<IA & IB, A> => ({
      decode: pipe(
        RE.Do as RE.ReaderEither<IA & IB, d.DecodeError, {}>,
        RE.apSW("a", fa.decode),
        RE.apSW("b", fb.decode),
        RE.map(({ a, b }) => semigroup.concat(a, b))
      ),
    })
}

export type ChromeDriverOptions = d.InputOf<typeof decoder>

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
