@{%
  const lexer = require(__dirname + '/' + 'lexer')
%}

@lexer lexer

MAIN -> AS

BRACKET -> %roundOpen TERM %roundClose | %squareOpen AS %squareClose | %curlyOpen AS %curlyClose

TERM -> ATOM

POWER -> TERM %factor TERM
MD -> TERM %multiply TERM | TERM %divide TERM
AS -> TERM %substract TERM | TERM %add TERM
ATOM -> %integer %decimal %integer | %integer | %fn TERM 
