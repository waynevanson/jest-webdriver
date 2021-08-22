import { setup } from "../../chromedriver/src"

export default async function () {
  await setup({ port: 4098, silent: true })
}
