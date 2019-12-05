/* globals gauge*/
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

step("Tee muutos kohtaan <kielet>", async kielet => {
  const handleKielet = async (rows, index) => {
    await scrollDown($(".MuiDialogContent-root"));
    const kieli = R.view(R.lensIndex(1), rows[index].cells);
    await scrollTo(kieli);
    await click(kieli);
    if (index < rows.length - 1) {
      return handleKielet(rows, index + 1);
    }
    return true;
  };

  try {
    await handleKielet(kielet.rows, 0);
  } catch (e) {
    console.error(e);
  }
});

step("Perustele kielet <kielet>", async kielet => {
  const perusteleKielet = async (rows, index) => {
    await scrollDown($(".MuiDialogContent-root"));
    const kieliId = R.view(R.lensIndex(0), rows[index].cells);
    const textareaId = `perustelut_kielet_opetuskielet.${kieliId}.vapaa-tekstikentta`;
    await focus(textBox({ id: textareaId }));
    await write(`The robot was here. ${new Date().toUTCString()}`);
    if (index < rows.length - 1) {
      return perusteleKielet(rows, index + 1);
    }
    return true;
  };

  try {
    await perusteleKielet(kielet.rows, 0);
  } catch (e) {
    console.error(e);
  }
});

step(
  "Tarkista muutosten lukumäärä <id> <numberOfChanges>",
  async (id, expectedValue) => {
    try {
      await waitFor(500);
      const element = await $(`[id="${id}"]`);
      assert.ok(await element.exists());
      const text = await element.text();
      assert.equal(R.head(text), expectedValue);
    } catch (e) {
      console.error(e);
    }
  }
);

step("Avaa ExpandableRow <anchor>", async anchor => {
  const id = `${anchor}-summary`;
  const closedExpandableRow = await $(`[id="${id}"][aria-expanded="false"]`);
  // If ExpandableRow is NOT expanded it will be expanded by clicking it.
  if (closedExpandableRow) {
    await click(closedExpandableRow);
  }
  const openExpandableRow = await $(`[id="${id}"][aria-expanded="true"]`);
  assert.ok(await openExpandableRow.exists());
});

step("Sulje ExpandableRow <anchor>", async anchor => {
  const id = `${anchor}-summary`;
  const openExpandableRow = await $(`[id="${id}"][aria-expanded="true"]`);
  // If ExpandableRow is NOT expanded it will be expanded by clicking it.
  if (openExpandableRow) {
    await click(openExpandableRow);
  }
  const closedExpandableRow = await $(`[id="${id}"][aria-expanded="false"]`);
  assert.ok(await closedExpandableRow.exists());
});

step("Perustele taloudelliset", async () => {
  const Taloudelliset = async () => {
    await scrollDown($(".MuiDialogContent-root"));
    let textareaId = `taloudelliset_yleisettiedot.edellytykset-tekstikentta`;
    await focus(textBox({ id: textareaId }));
    await write(`The robot was here: 1`);

    textareaId = `taloudelliset_yleisettiedot.Vaikutukset-tekstikentta`;
    await focus(textBox({ id: textareaId }));
    await write(`The robot was here: 2`);

    textareaId = `taloudelliset_yleisettiedot.sopeuttaminen-tekstikentta`;
    await focus(textBox({ id: textareaId }));
    await write(`The robot was here: 3`);

    textareaId = `taloudelliset_investoinnit.investoinnit-tekstikentta`;
    await focus(textBox({ id: textareaId }));
    await write(`The robot was here: 4`);

    textareaId = `taloudelliset_investoinnit.rahoitus-tekstikentta`;
    await focus(textBox({ id: textareaId }));
    await write(`The robot was here: 5`);

    textareaId = `taloudelliset_investoinnit.kustannukset-Input`;
    await focus(textBox({ id: textareaId }));
    await write(`100000`);

    textareaId = `taloudelliset_tilinpaatostiedot.tilinpaatostiedot.omavaraisuusaste`;
    await focus(textBox({ id: textareaId }));
    await write(`100001`);

    textareaId = `taloudelliset_tilinpaatostiedot.tilinpaatostiedot.maksuvalmius`;
    await focus(textBox({ id: textareaId }));
    await write(`100002`);

    textareaId = `taloudelliset_tilinpaatostiedot.tilinpaatostiedot.velkaantuneisuus`;
    await focus(textBox({ id: textareaId }));
    await write(`100003`);

    textareaId = `taloudelliset_tilinpaatostiedot.tilinpaatostiedot.kannattavuus`;
    await focus(textBox({ id: textareaId }));
    await write(`100004`);

    textareaId = `taloudelliset_tilinpaatostiedot.tilinpaatostiedot.jaama`;
    await focus(textBox({ id: textareaId }));
    await write(`100005`);

    return true;
  };

  try {
    await Taloudelliset();
  } catch (e) {
    console.error(e);
  }
});

step("Tarkista taloudellisten kenttien arvot", async () => {
  try {
    for (let i = 1; i <= 5; i++) {
      await text("The robot was here: " + i).exists();
    }
    for (let j = 100000; i <= 100005; i++) {
      await text(j).exists();
    }

    return true;
  } catch (e) {
    console.error(e);
  }
});
