import * as cp from "child_process";
import {
  console,
  readonlyArray as A,
  task,
  taskEither as TE,
  json as JSON,
  readerTaskEither as RTE,
} from "fp-ts";
import { identity, pipe } from "fp-ts/lib/function";
import _glob from "glob";
import path from "path";
import { fs } from "fp-ts-node";
import * as pkg from "../package.json";
import * as d from "io-ts/Decoder";

const glob = TE.taskify<string, _glob.IOptions, Error, Array<string>>(_glob);

const DIR_MONOREPO = path.resolve(__dirname, "../");

const workspaces = (cwd: string) =>
  pipe(
    pkg.workspaces,
    TE.traverseArray((string) => glob(string, { cwd })),
    TE.map(A.flatten),
    TE.map(A.map((workspace) => path.resolve(cwd, workspace))),
    TE.chainFirstIOK(console.log)
  );

const build = (cwd: string) =>
  pipe(
    TE.tryCatch(
      () =>
        new Promise<void>((res, rej) => {
          const p = cp.execFile("yarn", ["build"], { cwd });
          p.on("message", (message) => process.stdout.push(message));
          p.on("error", (message) => process.stderr.push(message));
          p.on("exit", (code, signal) => {
            code === 0 ? res() : rej({ code, signal });
          });
        }),
      identity
    )
  );

const printPackageName = pipe(
  fs.readFile(),
  RTE.local((string: string) => path.resolve(string, "./package.json")),
  RTE.map((buffer) => buffer.toString()),
  RTE.chainEitherKW(JSON.parse),
  RTE.chainEitherKW(
    pipe(
      d.struct({ name: d.string }),
      d.intersect(d.UnknownRecord),
      d.map((json) => json.name)
    ).decode
  ),
  RTE.chainIOK(console.log)
);

const main = pipe(
  workspaces(DIR_MONOREPO),
  TE.chainFirst(A.traverse(TE.ApplicativePar)(printPackageName)),
  TE.chainW(A.traverse(TE.ApplicativePar)(build)),
  TE.matchE(task.fromIOK(console.error), task.fromIOK(console.log))
);

main();
