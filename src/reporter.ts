import type {
  AggregatedResult,
  Context,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestResult,
} from "@jest/reporters"
import "webdriverio/async"
import type { Config } from "@jest/types"
import type { TestCaseResult } from "@jest/test-result"
import type { WebdriverIOConfigOptionsJest } from "./types"

export default class WebdriverIOReporter
  implements Reporter
{
  constructor(
    config: Config.GlobalConfig,
    options: WebdriverIOConfigOptionsJest,
  ) {}

  readonly onTestResult?: (
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) => Promise<void> | void

  readonly onTestFileResult?: (
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult,
  ) => Promise<void> | void

  readonly onTestCaseResult?: (
    test: Test,
    testCaseResult: TestCaseResult,
  ) => Promise<void> | void

  readonly onRunStart: (
    results: AggregatedResult,
    options: ReporterOnStartOptions,
  ) => Promise<void> | void

  readonly onTestStart?: (
    test: Test,
  ) => Promise<void> | void

  readonly onTestFileStart?: (
    test: Test,
  ) => Promise<void> | void

  readonly onRunComplete: (
    contexts: Set<Context>,
    results: AggregatedResult,
  ) => Promise<void> | void

  readonly getLastError: () => Error | void = () => {}
}

// TYPES
