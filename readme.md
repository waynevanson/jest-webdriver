# webdriverio-jest

A preset for jest to insert webdriverio.

## how it works

Once per suite (file), a browser instance is created and available as a global.

Once per run, a reporter is generated.

There is also a watc

# todo

separate into packages

- webdriverio-jest (includes the preset)
- webdriverio-jest-reporter
- fixtures/\*
  - these will be workspaces so we can download all modules into a single node modules for speeeeeed
