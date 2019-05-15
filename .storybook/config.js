import { configure } from "@storybook/react";
import "../src/css/tailwind.css";
import "../src/00-atoms/RadioButton/radio-button.css";

const req = require.context("../src/", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
