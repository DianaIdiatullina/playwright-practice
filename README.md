### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

## Playwright practice

Playwright exercises based on a Udemy course, practicing locators, actions, and assertions against the Ngx-Admin UI. Tests live in [tests/](tests/) and cover:

- locator syntax and user-facing locators (`tests/firstTest.spec.ts`)
- auto-waiting and alternative wait strategies (`tests/autoWaiting.spec.ts`)
- form inputs, radio buttons, checkboxes, dropdowns, tooltips, dialogs, tables, datepickers, and sliders (`tests/uiComponents.spec.ts`)

Run the app with `npm start`, then run the tests with `npx playwright test`.
