Feature: Validacion Servicios

  #Scenario Outline: Validate-Bussines
        #Then el usuario desea validar la condicion "<condicion>" del "<numero>"

       # Examples:
       #| numero                                                               | condicion |
      # | 3412419999                                                           | FIJO      |
      # | 3425469999                                                           | MOVIL     |
      # | pruebaconletras                                                      | ERROR     |
      # | 9086930485690348509348590348093859034859034859083405983490583490850  | ERROR     |
       #|                                                                      | NULL      |


    # Scenario:  Validar línea CRM

     #     Given una lista de usuarios
      #    When consulto por el CRM de uno de esos
       #   Then valido en que CRM se encuentra ese numero

     Scenario Outline: Servicio: "validate_user_structure_gpe"

          Given that user want run the API "<api>" in the scenery "<escenario>"
          When I complite the paramitres of body: usuarioCreador: "<usuarioCreador>", canal: "<canal>", tipo: "<tipo>", usuario centralizador: "<usuarioCentralizador>", usuario consulta: "<usuarioConsulta>", legajo: "<legajo>", Usp: "<Usp>"
          Then validate response

          Examples:
               | api                         | usuarioCreador    | canal | tipo | usuarioCentralizador   | usuarioConsulta   | legajo | Usp | escenario                                   |
               | validate_user_structure_gpe | 5287              |       |      | N                      | 11135             |        |     | Hijo de Padres distintos y no centralizador |
               | validate_user_structure_gpe | 5287              |       |      | Y                      | 11135             |        |     | Hijo de Padres distintos y si centralizador |
               | validate_user_structure_gpe | 3961              |       |      | N                      | 3961              |        |     | Padre mismo Padre NO centralizador          |
               | validate_user_structure_gpe | 55                |       |      | N                      | 10291             |        |     | Hijo de mismo Padre NO centralizador        |
               | validate_user_structure_gpe | 55                |       |      | N                      | 14                |        |     | Padre y otro Padre NO usuarioCentralizador  |
               | validate_user_structure_gpe | 5293              |       |      | N                      | 55                |        |     | Padre mismo Hijo NO centralizador           |
               | validate_user_structure_gpe | 10771             |       |      | N                      | 10771             |        |     | Hijo mismo Hijo NO centralizador            |
               | validate_user_structure_gpe | 17483             |       |      | N                      | 8539              |        |     | Hijo y Hijo de otro Padre NO centralizador  |
               | validate_user_structure_gpe | 17483             |       |      | Y                      | 8539              |        |     | Hijo y Hijo de otro Padre SI centralizador  | 
        


          