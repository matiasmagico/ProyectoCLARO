const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When("el usurio {string}", (service) => {
    cy.log('method: ' + cy.readFile('cypress/e2e/data/api/prueb.json'))
    cy.log('method: ' + cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.method'))
    cy.log('method: ' + cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.url'))
    cy.log('method: ' + cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.headers'))
   //correccion
    cy.log('method: ' + cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.body'))
    
    cy.request({
        method: cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.method'),
        url: cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.url'),
        headers: cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.headers'),
        body: cy.readFile('cypress/e2e/data/api/prueb.json').its(service + '.body')    
      }).then(response => {
        const target = response.body.email;
      })
});

//Then("I should see a search bar", () => {
  //cy.get("input").should(
    //"have.attr",
    //"placeholder",
    //"Search the web without being tracked"
  //);

 // assert.deepEqual({}, {});
//});