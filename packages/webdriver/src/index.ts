/**
 * We need the following things:
 * - jest-preset file
 * - environment
 *   - add client/session
 */
import type { Config } from "@jest/types"
import type { Options } from "@wdio/types"
import { default as NodeEnvironment } from "jest-environment-node"
import { Context } from "vm"
import { Client, default as Webdriver } from "webdriver"

declare module "@jest/types/build/config" {
  export interface ConfigGlobals {
    readonly webdriver?: {
      options?: Options.WebDriver
    }
  }
}

export class WebdriverEnvironment extends NodeEnvironment {
  private _client?: Client
  private options: Options.WebDriver

  constructor(config: Config.ProjectConfig) {
    super(config)

    if (!!config.globals.webdriver?.options) {
      this.options = config.globals.webdriver.options
    } else {
      throw new Error("no webdriver config exists!")
    }
  }

  async setup(): Promise<void> {
    await super.setup()
    // this._client = await Webdriver.newSession(this.options)
  }

  async teardown(): Promise<void> {
    // await this._client?.deleteSession()
    await super.teardown()
  }

  getVmContext(): Context | null {
    return super.getVmContext()
  }
}

export default WebdriverEnvironment
