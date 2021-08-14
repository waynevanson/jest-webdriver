import type {
  AggregatedResult,
  Context,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestResult,
} from "@jest/reporters"
import type { TestCaseResult } from "@jest/test-result"
import type { Config } from "@jest/types"
import type { WebdriverIOGlobalOptions } from "../common/types"

export default class WebdriverIOReporter implements Reporter {
  constructor(
    public config: Config.GlobalConfig,
    public options: WebdriverIOGlobalOptions,
  ) {}

  readonly onTestResult?: (
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) => Promise<void> | void = async () => {}

  readonly onTestFileResult?: (
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) => Promise<void> | void = async () => {}

  readonly onTestCaseResult?: (
    test: Test,
    testCaseResult: TestCaseResult,
  ) => Promise<void> | void = async () => {}

  readonly onRunStart: (
    results: AggregatedResult,
    options: ReporterOnStartOptions,
  ) => Promise<void> | void = async () => {}

  readonly onTestStart?: (test: Test) => Promise<void> | void = async () => {}

  readonly onTestFileStart?: (test: Test) => Promise<void> | void =
    async () => {}

  readonly onRunComplete: (
    contexts: Set<Context>,
    results: AggregatedResult,
  ) => Promise<void> | void = async () => {}

  readonly getLastError: () => Error | void = () => {}
}
