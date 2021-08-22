import { default as Webdriver } from "webdriver"

// each session should have one client
describe("webdriver", () => {
  it("contains a global session", () => {
    expect(client).toBeDefined()
  })
})
