const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

//If using this approach, just call the key "setupNodeEvents" in the E2E configurations
// async function setupNodeEvents(on, config) {
//   await addCucumberPreprocessorPlugin(on, config);
//   on(
//     "file:preprocessor",
//     createBundler({
//       plugins: [createEsbuildPlugin(config)],
//     })
//   );
//   return config;
// }

// <reference types="cypress" />

const oracledb = require("oracledb");

/**
 * @type {Cypress.PluginConfig}
 */

oracledb.initOracleClient({libDir: 'C:\\instantclient_21_6'});

const queryData = async(query, dbconfig) => {
  let conn;
  try{
      conn = await oracledb.getConnection(dbconfig);
      result = await conn.execute(query);
      console.log(result)
      return result
  }catch(err){
      console.log("Error===>"+err)
      return err
  } finally{
    if(conn){
      try{
        conn.close();
      }catch(err){
        console("Error===>"+err);
      }
    }
  }
}

module.exports = defineConfig({
  env: {
    db: {
        "user": "stl",
        "password": "stl",
        "connectString" : "bengolea.claro.amx:1521/ardprod"
    }
  },
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("task", {
        sqlQuery: (query) => {
          return queryData(query, config.env.db);
        }
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
  },
});
