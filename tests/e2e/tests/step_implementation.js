/* globals gauge*/
"use strict";
const {
  goto,
  link,
  click,
  openBrowser,
  closeBrowser,
  write,
  inputField,
  focus,
  button,
  text
} = require("taiko");
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === "true";

beforeSuite(async () => {
  await openBrowser({ headless: headless });
});

afterSuite(async () => {
  await closeBrowser();
});

step("Navigate to app", async () => {
  try {
    await goto("https://oivadev.csc.fi/");
  } catch (e) {
    console.error(e);
  }
});

step("Log in", async () => {
  await click(link({ href: "/cas-auth" }));
  await write("oiva-sanni");
  await focus(inputField({ type: "password" }));
  await write("oiva-sanni"); 
  await click(button({ type: "submit" }));
  assert.ok(await text("Kirjaudu ulos").exists());
});

step("Log out", async () => {
  try {
    await click(link({ href: "/cas-logout" }));
  } catch (e) {
    console.error(e);
  }
});

step("Jarjestamislupa", async () => {
  try {
    click("Järjestämislupa");
    assert.ok(await text("Tutkinnot ja koulutukset").exists());
  } catch (e) {
    console.error(e);
  }
});
