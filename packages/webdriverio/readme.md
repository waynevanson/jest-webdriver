# @webdriver-jest/webdriverio

## Summary

`@webdriver-jest/webdriverio` takes care of the following:

- Injecting globals
  - remote
  - driver
  - $$
  - $
- Syncing and integrating events from `jest-circus`, jests's test runner, with webdriverio's reporters and services.

## Configuration

2. Add global setup and global teardown
1. Add Reporter
1. Options in `jest.globals.webdriver-jest.webdriverio`

## Multiremote

todo - put in a different readme and reference it here.

Configuration is the same, with one difference. Options is of type `Record<string,WebdriverIOOptions>`, where each key is a browser name.
It's exported under `@webdriverio-jest/webdriverio/multiremote` so separate typescript types can be used.

## Thinking

How to trigger webdriverio reporter? Try `wdio-runner/reporter#defaul(BaseReporter)`
