# webdriver-jest

A slew of low level tools that integrate webdriver tools with jest.

By default, it exports a Jest Environment that extends Jest's Node Environment.

# Webdriver

| Lifecycle             | Actions                           |
| :-------------------- | :-------------------------------- |
| onRun{Start,End}      | Start/Stop the webdriver (server) |
| onTestFile{Start,End} | Create/Destroy a session (client) |
