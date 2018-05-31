/* eslint-disable */
// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require(__dirname + '/' + 'lexer')
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "MAIN", "symbols": ["AS"]},
    {"name": "EXPRESSION", "symbols": [(lexer.has("roundOpen") ? {type: "roundOpen"} : roundOpen), "AS", (lexer.has("roundClose") ? {type: "roundClose"} : roundClose)]},
    {"name": "EXPRESSION", "symbols": [(lexer.has("squareOpen") ? {type: "squareOpen"} : squareOpen), "AS", (lexer.has("squareClose") ? {type: "squareClose"} : squareClose)]},
    {"name": "EXPRESSION", "symbols": [(lexer.has("curlyOpen") ? {type: "curlyOpen"} : curlyOpen), "AS", (lexer.has("curlyClose") ? {type: "curlyClose"} : curlyClose)]},
    {"name": "EXPRESSION", "symbols": ["ATOM"]},
    {"name": "POWER", "symbols": ["EXPRESSION", (lexer.has("factor") ? {type: "factor"} : factor), "POWER"]},
    {"name": "POWER", "symbols": ["EXPRESSION"]},
    {"name": "MD", "symbols": ["MD", (lexer.has("multiply") ? {type: "multiply"} : multiply), "POWER"]},
    {"name": "MD", "symbols": ["MD", (lexer.has("divide") ? {type: "divide"} : divide), "POWER"]},
    {"name": "MD", "symbols": ["POWER"]},
    {"name": "AS", "symbols": ["AS", (lexer.has("substract") ? {type: "substract"} : substract), "MD"]},
    {"name": "AS", "symbols": ["AS", (lexer.has("add") ? {type: "add"} : add), "MD"]},
    {"name": "AS", "symbols": ["MD"]},
    {"name": "ATOM", "symbols": [(lexer.has("integer") ? {type: "integer"} : integer), (lexer.has("decimal") ? {type: "decimal"} : decimal), (lexer.has("integer") ? {type: "integer"} : integer)]},
    {"name": "ATOM", "symbols": [(lexer.has("integer") ? {type: "integer"} : integer)]},
    {"name": "ATOM", "symbols": [(lexer.has("fn") ? {type: "fn"} : fn), "EXPRESSION"]}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
