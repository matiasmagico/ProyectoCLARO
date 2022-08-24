const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const json = require("../e2e/data/api/prueb")

When("el usurio", () => {

  cy.log(json.prueba.method)
  cy.log(json.prueba.url)
  cy.log(json.prueba3.status)
  cy.log(json.prueba4.method)
  cy.log(json.prueba4.url)
  cy.log(json.prueba4.headers)
})

Then("vlid ue todo slio ok", () => {
  cy.log('prueba')
  cy.request({
    method: json.prueba.method,
    url: json.prueba.url
  })

  cy.log('prueba4')
  cy.request({
    method: json.prueba4.method,
    url: json.prueba4.url,
    status: json.prueba4.status,
    headers: json.prueba4.headers,

  })


  cy.log('prueb2')
  cy.request({
    method: json.prueba2.method,
    url: json.prueba2.url,
    headers: json.prueba2.headers,
    body: json.prueba2.body
  }).then((response) => {
    cy.log(response.body)
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('message', 'SUCCESS')
    expect(response.body).to.have.property('id')
    cy.log(response.body.id)
  })
});

