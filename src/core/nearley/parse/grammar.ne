@{%
  const lexer = require(__dirname + '/' + 'lexer')
%}

@lexer lexer

MAIN -> AS
EXPRESSION -> %roundOpen AS %roundClose | %squareOpen AS %squareClose | %curlyOpen AS %curlyClose | ATOM
POWER -> EXPRESSION %factor POWER | EXPRESSION
MD -> MD %multiply POWER | MD %divide POWER | POWER
AS -> AS %substract MD | AS %add MD | MD
ATOM -> %integer %decimal %integer | %integer | %fn EXPRESSION
