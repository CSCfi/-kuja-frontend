"use strict";

const R = require("ramda");

const {
  $,
  button,
  goto,
  click,
  closeBrowser,
  currentURL,
  focus,
  inputField,
  into,
  link,
  openBrowser,
  scrollDown,
  scrollTo,
  text,
  textBox,
  waitFor,
  write
} = require("taiko");
const chai = require("chai");
const assert = chai.assert;
