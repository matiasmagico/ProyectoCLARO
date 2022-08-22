const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: [
      "**/*.feature",
      "**/fetures/*.feature"
    ],
    stepDefinitions: [
      "cypress/e2e/*.{js,ts}",
      "cypress/e2e/steps_definitions/*.{js,ts}",
      "cypress/support/step_definitions/**/*.{js,ts}",
    ],
    supportFile: false,
    setupNodeEvents,
  },
});