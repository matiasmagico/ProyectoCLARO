import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
var data = require("../../fixtures/API.json")
const dataenviroment = require("../../fixtures/dataenviroment/dataBase.json")
var api

Then("el usuario desea validar la condicion {string} del {string}", (condicion, numero) => {
  cy.log("Configuramos los valores a utilizar ")
  data["validate-business"].request.body.billNumber = numero

  if (!numero) {
    data["validate-business"].response.status = 400
  }

  if (condicion === "ERROR") {
    data["validate-business"].response.body.business = null
    data["validate-business"].response.body.error = data["validate-business"].response.default.error
  } else {
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
    if (response.status === 200) {
      expect(response.body.business).to.eq(data["validate-business"].response.body.business)
      expect(response.body.error).to.eq(data["validate-business"].response.body.error)
    }
  })
})



// VALIDAR CRM  



/*Given('una lista de usuarios', () => {
  const listaUsuarios = ""
  const numerodeusuario = ""
})

When('consulto por el CRM de uno de esos', () => {
  cy.request({
    url: dataenviroment.validateCrm,
    headers: data.validateCrm.request.headers,
    method: data.validateCrm.request.method,
    body: data.validateCrm.request.body.portCellularNumber,
  })
})

Then('valido en que CRM se encuentra ese numero', () => {
  const SQL_NOT_ON_STORE_STATUS = "SELECT prg_type_number FROM PORT_PORTING_RANGES";
  cy.task("sqlQuery", SQL_NOT_ON_STORE_STATUS).then((resolvedValue) => {
    resolvedValue["rows"].forEach((item) => {
      cy.log("result==>" + item);
    })
  })*/



// validate_user_structure_gpe 


  Given('that user want run the API {string} in the scenery {string}', (api, escenario) => {
    this.api = api
  })

  When('I complite the paramitres of body: usuarioCreador: {string}, canal: {string}, tipo: {string}, usuario centralizador: {string}, usuario consulta: {string}, legajo: {string}, Usp: {string}',
    (SRYENTLD, USRCANLD, USRTENTID, USRCENTRLIZING, USRENTID, USRLEG, USRUSP) => {
      cy.log('armando body'),
        data[this.api].request.body.sryEntId = SRYENTLD,
        data[this.api].request.body.usrCanId = USRCANLD,
        data[this.api].request.body.usrCentralizing = USRCENTRLIZING,
        data[this.api].request.body.usrEntID = USRENTID,
        data[this.api].request.body.usrLeg = USRLEG,
        data[this.api].request.body.usrTentId = USRTENTID,
        data[this.api].request.body.usrUsp = USRUSP
    })

  Then('validate response', () => {
    var query = "SELECT * FROM a_estructura WHERE ent_id_padre = SRYENTLD AND ent_id = USRENTID"
    cy.request({
      url: dataenviroment[this.api],
      headers: data[this.api].request.headers,
      method: data[this.api].request.method,
      body: data[this.api].request.body,
    }).then((response) => {
      if (data[this.api].request.body.usrCentralizing === "Y") {
        expect(response.body.resultViewGPE).to.eq("Y")
      } else {
        if (data[this.api].request.body.usrEntID === data[this.api].request.body.sryEntId) {
          expect(response.body.resultViewGPE).to.eq("Y")
        } else {
          cy.task("sqlQuery", query).then((result) => {
            if (result != 0) {
              expect(response.body.resultViewGPE).to.eq("Y")
            } else {
              expect(response.body.resultViewGPE).to.eq("N")
            }
          })
        }
      }
    })
  })
