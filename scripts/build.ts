import { fs } from "fp-ts-node"
import * as pkg from "../package.json"
import _glob from "glob"
import { readonlyArray as A, taskEither as TE } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import path from "path"

const glob = TE.taskify<string, _glob.IOptions, Error, Array<string>>(_glob)

const main = pipe(
  pkg.workspaces,
  TE.traverseArray((string) =>
    glob(string, { cwd: path.resolve(__dirname, "../") })
  ),
  TE.map(A.flatten)
)
