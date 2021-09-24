// each session should have one client
describe("webdriver", () => {
  it("contains a global session", () => {
    expect(session).toBeDefined()
  })

  it("should have a valid config object", () => {
    expect(webdriver).toBeDefined()
  })
})
