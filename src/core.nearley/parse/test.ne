MAIN -> NUMBER | (EXP)
EXP -> EXP AS TERM | TERM
TERM -> TERM MD FACTOR | FACTOR
FACTOR -> EXP "^" FACTOR | EXP
MD -> "*" | "/"
AS -> "+" | "-"



NUMBER ->
      INT "." INT   {% function(d) {return parseFloat(d[0] + '.' + d[2])} %}
      INT "," INT   {% function(d) {return parseFloat(d[0] + '.' + d[2])} %}
      | INT           {% function(d) {return parseInt(d[0])} %}

INT -> [0-9]:+        {% function(d) {return d[0].join(""); } %}
