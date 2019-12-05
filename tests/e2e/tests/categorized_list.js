"use strict";

const { $ } = require("taiko");
const chai = require("chai");
const assert = chai.assert;

async function verifyThatElementUnderAnchorIsChecked(
  type,
  anchor,
  statusSelector = ""
) {
  try {
    const element = await $(
      `[data-anchor="${anchor}"] [type="${type}"]${statusSelector}`
    );
    assert.ok(await element.exists());
  } catch (e) {
    console.error(e);
  }
}

step("Assert if <type> <anchor> is checked", async (type, anchor) => {
  verifyThatElementUnderAnchorIsChecked(type, anchor, ":checked");
});

step("Assert if <type> <anchor> is not checked", async (type, anchor) => {
  verifyThatElementUnderAnchorIsChecked(type, anchor, "");
});
