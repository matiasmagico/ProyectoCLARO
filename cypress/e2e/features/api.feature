Feature: numeros de telefono
 # Scenario Outline: validacion de numero de telefono
    
  #  Given un <numero> de telefono
   # When el usuario consulta un <numero> de telefono
    #Then validar <condicion> de tal numero

   # Examples:
    #    | numero     | condicion |
     #   | 3412410001 | fijo      |
      #  | 3425460001 | movil     |
       #|    -       | error     |

  Scenario Outline: modificas valor desde json
        When el usuario requiere una api "<numero>"

        Examples:
       | numero     | condicion |
       | 3412410001 | fijo      |
       | 3425460001 | movil     |
       |    -       | error     |