import { option as O, readonlyArray as A, semigroup as SG } from "fp-ts"
import { flow, identity, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"

export type Args = ReadonlyArray<string>

export const truthy = pipe(
  c.boolean,
  c.refine((a): a is true => a, "true"),
)

export const falsey = pipe(
  c.boolean,
  c.refine((a): a is false => !a, "false"),
)

export const fromNullableBoolean = <A extends boolean | null | undefined>(
  a: A,
) => pipe(a, O.fromNullable, O.chain(O.fromPredicate(identity)))

export const loggable_loud_options = pipe(
  c.make(
    d.partial({
      replayable: truthy,
      readable_timestamp: truthy,
      append_log: truthy,
      log_path: c.string,
      enable_chrome_logs: falsey,
      silent: falsey,
    }),
    // convert each key into a value
    {
      // increases LOG LENGTH TO INFO!
      encode: ({ log_path, append_log, replayable, readable_timestamp }) =>
        A.compact([
          pipe(
            log_path,
            O.fromNullable,
            O.map((log_path) => `--log-path="${log_path}"`),
          ),
          pipe(
            append_log,
            fromNullableBoolean,
            O.map(() => `--append-log`),
          ),
          pipe(
            replayable,
            fromNullableBoolean,
            O.map(() => `--replayable`),
          ),
          pipe(
            readable_timestamp,
            fromNullableBoolean,
            O.map(() => `--readable-timestamp`),
          ),
        ]),
    },
  ),
)

export const loggable_silent_options = c.make(
  d.partial({
    replayable: falsey,
    readable_timestamp: falsey,
    append_log: falsey,
    enable_chrome_logs: falsey,
    verbose: falsey,
  }),
  { encode: () => [] as ReadonlyArray<string> },
)

export const log_level_between = c.make(
  pipe(
    d.struct({
      log_level: d.literal("DEBUG", "INFO", "WARNING", "SEVERE"),
    }),
    d.intersect(loggable_loud_options),
    d.intersect(d.partial({ verbose: falsey, silent: falsey })),
  ),
  {
    encode: ({ log_level, ...rest }) =>
      pipe(
        loggable_loud_options.encode(rest),
        A.append(`--log-level=${log_level}`),
      ) as ReadonlyArray<string>,
  },
)

export const log_level_verbose = c.make(
  pipe(
    d.union(
      d.struct({ verbose: truthy }),
      d.struct({ log_level: d.literal("ALL") }),
    ),
    d.intersect(loggable_loud_options),
  ),
  {
    encode: (props) =>
      pipe(
        props,
        loggable_loud_options.encode,
        A.append(`--verbose`),
      ) as ReadonlyArray<string>,
  },
)

export const log_level_silent = c.make(
  pipe(
    d.union(
      d.struct({ silent: truthy }),
      d.struct({ log_level: d.literal("OFF") }),
    ),
    d.intersect(loggable_silent_options),
  ),
  {
    encode: (props) =>
      pipe(
        props,
        loggable_silent_options.encode,
        A.append(`--silent`),
      ) as ReadonlyArray<string>,
  },
)

export const enable_chrome_logs = c.make(
  d.struct({ enable_chrome_logs: truthy }),
  { encode: () => [`--enable-chrome-logs`] as ReadonlyArray<string> },
)

export const empty = c.make(d.struct({}), {
  encode: () => [] as ReadonlyArray<string>,
})

export function recode<O, X extends readonly c.Codec<unknown, O, any>[]>(
  ...codecs: X
) {
  return (a: unknown) =>
    pipe(
      codecs,
      A.foldMap(O.getMonoid(SG.first<O>()))((codec) =>
        pipe(a, codec.decode, O.fromEither, O.map(codec.encode)),
      ),
    )
}

const logs = [
  log_level_between,
  log_level_verbose,
  log_level_silent,
  enable_chrome_logs,
  empty,
] as const

export const log = c.make(d.union(...logs), {
  encode: flow(
    recode(...logs),
    O.fold(
      () => [] as ReadonlyArray<string>,
      (a) => a as ReadonlyArray<string>,
    ),
  ),
})
