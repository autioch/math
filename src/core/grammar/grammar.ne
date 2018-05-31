@{%
  const lexer = require(__dirname + '/' + 'lexer')
%}

@lexer lexer

MAIN -> AS
AS -> AS %as MD | MD
MD -> MD %md POW | POW
POW -> TERM %pow POW | TERM
TERM -> %open AS %close | FN
FN -> %fn TERM | %number
