import type { Config } from "@jest/types"
import type { Options } from "@wdio/types"
import NodeEnvironment from "jest-environment-node"
import { Context } from "vm"
import Webdriver from "webdriver"

declare module "@jest/types/build/config" {
  export interface ConfigGlobals {
    readonly webdriver: {
      options: Options.WebDriver
    }
  }
}

declare global {
  const webdriver: {
    options: Options.WebDriver
  }
}

export class WebdriverEnvironment extends NodeEnvironment {
  private _options: Options.WebDriver

  constructor(config: Config.ProjectConfig) {
    super(config)

    if (!config.globals.webdriver?.options) {
      throw new Error("no webdriver config exists!")
    }

    this._options = config.globals.webdriver.options
  }

  async setup(): Promise<void> {
    await super.setup()

    this.global.session = await Webdriver.newSession(this._options)
  }

  async teardown(): Promise<void> {
    await this.global?.session?.deleteSession()
    await super.teardown()
  }

  getVmContext(): Context | null {
    return super.getVmContext()
  }
}

export default WebdriverEnvironment
