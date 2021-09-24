import { teardown } from "../../../chromedriver/src"

export default async function () {
  await teardown()
}
