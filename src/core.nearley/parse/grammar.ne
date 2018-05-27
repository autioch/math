@{%
  const lexer = require(__dirname + '/' + 'lexer')
%}

@lexer lexer

MAIN -> _ AS _
P -> %roundOpen _ AS _ %roundClose | %squareOpen _ AS _ %squareClose | %curlyOpen _ AS _ %curlyClose | N
E -> P _ %factor _ E | P
MD -> MD _ %multiply _ E | MD _ %divide _ E | E
AS -> AS _ %substract _ MD | AS _ %add _ MD | MD
N -> NUMBER | %fn _ P
NUMBER ->  %integer %decimal %integer | %integer
_ -> null | %space {% d => null %}
