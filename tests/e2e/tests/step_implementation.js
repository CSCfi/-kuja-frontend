/* globals gauge*/
"use strict";
const {
  $,
  button,
  goto,
  click,
  closeBrowser,
  currentURL,
  focus,
  inputField,
  link,
  openBrowser,
  scrollDown,
  scrollTo,
  text,
  write
} = require("taiko");
const chai = require("chai");
const assert = chai.assert;
const headless = process.env.headless_chrome.toLowerCase() === "true";

beforeSuite(async () => {
  await openBrowser({ headless: headless });
});

afterSuite(async () => {
  await closeBrowser();
});

step("Navigate to app", async () => {
  try {
    // await goto("https://oivadev.csc.fi/");
    await goto("http://localhost");
  } catch (e) {
    await click($("#details-button"));
    await click($("#proceed-link"));
  }
});

step("Log in as <username>", async username => {
  await click(link({ href: "/cas-auth" }));
  await write(username);
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

step("Avaa uusi muutospyyntolomake", async () => {
  try {
    await click(link("Järjestämislupa-asiat"));
    await click(link("Uusi hakemus"));
  } catch (e) {
    console.error(e);
  }
});

step("Edellinen sivu", async () => {
  try {
    await click($("button.previous"));
  } catch (e) {
    console.error(e);
  }
});

step("Seuraava sivu", async () => {
  try {
    await click($("button.next"));
  } catch (e) {
    console.error(e);
  }
});

step("Tarkista, että ollaan sivulla <pageNumber>", async pageNumber => {
  try {
    assert.include(await currentURL(), `uusi/${pageNumber}`);
  } catch (e) {
    console.error(e);
  }
});

step("Lomakeoperaatio <sectionId> valitse <item>", async (sectionId, item) => {
  try {
    //await scrollDown($(".MuiDialogContent-root"));
    await scrollTo(item);
    await click(item);
  } catch (e) {
    console.error(e);
  }
});

step("Sulje lomake", async () => {
  try {
    await click($('button[aria-label="Close"]'));
    await click("Kyllä");
    assert.notInclude(await currentURL(), "hakemukset-ja-paatokset");
  } catch (e) {
    console.error(e);
  }
});

step("Assert if text exists <string>", async string => {
  try {
    assert.ok(await text(string).exists());
  } catch (e) {
    console.error(e)
  }
});