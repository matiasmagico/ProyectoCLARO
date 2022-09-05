const { When, Then, Given } = require("@badeball/cypress-cucumber-preprocessor");
const { error } = require("cypress/types/jquery");
const data = require("../../fixtures/API.json")


Then("el usuario desea validar la {string} del {string}", (condicion, numero) => {

  cy.log("Configuramos los valores a utilizar")
  data["validate-business"].request.body.cellularNumber = numero

  if(numero === "NULL"){
    cy.log("numero = NULL")
    data["validate-business"].response.status = 400
    data["validate-bussines"].request.body.cellularNumber = null
  }

  if(condicion === "ERROR"){
    cy.log("condicion = Error")
    data["validate-business"].response.body.business = null
  }else{
    cy.log("else")
    data["validate-business"].response.body.business = condicion
    data["validate-business"].response.body.error = null
  }

  cy.log("request")
  cy.log("url: " + data["validate-business"].request.url)
  cy.log("headers: " + data["validate-business"].request.headers["Content-Type"])
  cy.log("method: " + data["validate-business"].request.method)
  cy.log("body: " + data["validate-business"].request.body.cellularNumber)
  cy.log("response")
  cy.log("status: " + data["validate-business"].response.status)
  cy.log("business: " + data["validate-business"].response.body.business)
  cy.log("error: " + data["validate-business"].response.body.error)

  cy.request({
    url: data["validate-business"].request.url,
    headers: data["validate-business"].request.headers,
    method: data["validate-business"].request.method,
    body: data["validate-business"].request.body
  }).then((response) => {
    cy.log("body completo b")
    cy.log(response.body)
    expect(response.status).to.eq(data["validate-business"].response.status)
    expect(response.body.business).to.eq(data["validate-business"].response.body.business)
    cy.log(response.body.error)
  })
})

Then ("si el responce da ERROR emitir mensaje de error.", ()=> {
  
  cy.log(response.body)
  if (response.body === error)
  cy.log(response.body.error)
  })