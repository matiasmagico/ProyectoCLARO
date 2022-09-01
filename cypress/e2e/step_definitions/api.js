const { When, Then, Given } = require("@badeball/cypress-cucumber-preprocessor");
const data = require("../../fixtures/API.json")


Then("el usuario desea validar la {string} del {string}", (condicion, numero) => {

  cy.log("Configuramos los valores a utilizar")
  data["validate-bussines"].request.body.cellularNumber = numero

  if(numero === "NULL"){
    data["validate-bussines"].response.status = 400
    data["validate-bussines"].request.body.cellularNumber = null
  }

  if(condicion === "ERROR"){
    data["validate-bussines"].response.body.businessValidateResponse = null
  }else{
    data["validate-bussines"].response.body.businessValidateResponse = condicion
    data["validate-bussines"].response.body.error = null
  }

  /*cy.log("url: " + data["validate-bussines"].request.url)
  cy.log("headers: " + data["validate-bussines"].request.headers["Content-Type"])
  cy.log("method: " + data["validate-bussines"].request.method)
  cy.log("body: " + data["validate-bussines"].request.body.cellularNumber)
  cy.log("status: " + data["validate-bussines"].response.status)
  cy.log("body: " + data["validate-bussines"].response.body.businessValidateResponse)
  cy.log("body: " + data["validate-bussines"].response.body.error)*/

  cy.request({
    url: data["validate-bussines"].request.url,
    headers: data["validate-bussines"].request.headers,
    method: data["validate-bussines"].request.method,
    body: data["validate-bussines"].request.body
  }).then((response) => {
    expect(response.status).to.eq(data["validate-bussines"].response.status)
    expect(response.body.businessValidateResponse).to.eq(data["validate-bussines"].response.body.businessValidateResponse)
    cy.log("Mensaje de error: " + response.body.error)
  })
})
