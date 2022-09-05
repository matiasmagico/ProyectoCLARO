import { Then } from "@badeball/cypress-cucumber-preprocessor"
var data = require("../../fixtures/API.json")
const dataenviroment = require("../../fixtures/dataenviroment/dev.json") 

Then("el usuario desea validar la {string} del {string}", (condicion, numero) => {
  cy.log("Configuramos los valores a utilizar ")
  data["validate-business"].request.body.billNumber = numero

  if(!numero){
    data["validate-business"].response.status = 400
  }

  if(condicion === "ERROR"){
    data["validate-business"].response.body.business = null
    data["validate-business"].response.body.error = data["validate-business"].response.default.error
  }else{
    data["validate-business"].response.body.business = condicion
    data["validate-business"].response.body.error = null
  }
cy.log(data["validate-business"].response.status)
  cy.request({
    url: dataenviroment["validatebusiness"],
    headers: data["validate-business"].request.headers,
    method: data["validate-business"].request.method,
    body: JSON.stringify(data["validate-business"].request.body),
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(data["validate-business"].response.status)
    if(response.status === 200){
      expect(response.body.business).to.eq(data["validate-business"].response.body.business)
      expect(response.body.error).to.eq(data["validate-business"].response.body.error)
    }
  })
})