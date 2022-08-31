const { When, Then, Given } = require("@badeball/cypress-cucumber-preprocessor");
const json = require("../e2e/data/api/prueb.json")


When("el usuario requiere una api {string} {string}", (prueba, condicion) => {

  cy.log(json.prueba2.body["Validate-bussiness"].billNumber)
  json.prueba2.body["Validate-bussiness"].billNumber = prueba
  cy.log(json.prueba2.body["Validate-bussiness"].billNumber)
  cy.log(json.prueba2.body["Validate-bussiness"])
  cy.log(json.prueba2.body)

  cy.log(json.prueba2.response.tipo)
  json.prueba2.response.tipo = condicion

  cy.expect(response.body).to.equal(json.prueba2.response.tipo)
})

Then("validar que todo salio ok", () => {
  cy.log('claroapi')
  cy.request({
    id: json.id,
    url: json.url,
  });
})

  cy.log('prueba4')
  cy.request({
    method: json.id,
    url: json.url,
    body:
    headers
  });
then((response) => {
    cy.log('vote id= ' + response.body.tipo)
    cy.expect(response.status).to.equal(json.prueba2.status)
    cy.expect(response.body).to.equal(json.prueba2.response.tipo)
  })
  

  cy.log('prueba5')
  cy.request({
    method: json.prueba5.method,
    url: json.prueba5.url,
    body: json.prueba5.body,
    headers: json.prueba5.headers,
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
;

