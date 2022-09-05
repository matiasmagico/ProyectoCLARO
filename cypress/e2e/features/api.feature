Feature: Validacion Servicios

  Scenario Outline: Validate-Bussines
        Then el usuario desea validar la "<condicion>" del "<numero>"

        Examples:
       | numero                                                               | condicion |
       | 3412419999                                                           | FIJO      |
       | 3425469999                                                           | MOVIL     |
       | pruebaconletras                                                      | ERROR     |
       | 9086930485690348509348590348093859034859034859083405983490583490850  | ERROR     |
       |   | NULL     |