# @webdriver-jest/webdriver

## Summary

`@webdriver-jest/webdriver` takes care of setting up your jest environment.

## Configuration

1. Insert Globals webdriver
2. Add global setup and global teardown for starting a webdriver server

## Installation

Install the required packages by running `<yarn add|npm install> -D @webdriver-jest/webdriver` in the directory of your project.

## Configuration

All the configuration will be reference in your jest configuration file. Preference converting your file to typescript so you have some typesafety when adding the options.

We export a preset that contains [`testEnvironment`](https://jestjs.io/docs/configuration#testenvironment-string), [`globals`](https://jestjs.io/docs/configuration#globals-object) and [`testTimeout`](https://jestjs.io/docs/configuration#testtimeout-number) properties, related to [jest's configuration](https://jestjs.io/docs/configuration#options).

```ts
// jest.config.ts
import * as webdriver from "@webdriver-jest/webdriver"

export default {
  ...webdriver.preset,
  // rest of your configuration
}
```

### Accessing Client/Session0

We will have implemented a custom `TestEnvironment`, so you have access to a session.
Ideally, it seems good practice to have one session per test file.
Tests are not run concurrently, meaning they're run one by one in a file. Jest will still run multiple files at once, which we can allow.

Access the session via `window.client` or `import { client } from "webdriver-jest/globals"`.
