import { InitialOptionsTsJest } from "ts-jest/dist/types"
import { register } from "ts-node"

register()

const configuration: InitialOptionsTsJest = {
  rootDir: "../",
}

export default configuration
