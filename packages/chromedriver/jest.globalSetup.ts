import { Config } from "@jest/types";
import { start } from "./src/index";

export default async function globalSetup(config: Config.GlobalConfig) {
  await start({ logging: { silent: true }, port: 6666 });
}
