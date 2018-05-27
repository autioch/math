// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
/* eslint-disable */
(function () {
function id(x) { return x[0]; }

  const lexer = require(__dirname + '/' + 'lexer')
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "MAIN", "symbols": ["_", "AS", "_"]},
    {"name": "P", "symbols": [(lexer.has("roundOpen") ? {type: "roundOpen"} : roundOpen), "_", "AS", "_", (lexer.has("roundClose") ? {type: "roundClose"} : roundClose)]},
    {"name": "P", "symbols": [(lexer.has("squareOpen") ? {type: "squareOpen"} : squareOpen), "_", "AS", "_", (lexer.has("squareClose") ? {type: "squareClose"} : squareClose)]},
    {"name": "P", "symbols": [(lexer.has("curlyOpen") ? {type: "curlyOpen"} : curlyOpen), "_", "AS", "_", (lexer.has("curlyClose") ? {type: "curlyClose"} : curlyClose)]},
    {"name": "P", "symbols": ["N"]},
    {"name": "E", "symbols": ["P", "_", (lexer.has("factor") ? {type: "factor"} : factor), "_", "E"]},
    {"name": "E", "symbols": ["P"]},
    {"name": "MD", "symbols": ["MD", "_", (lexer.has("multiply") ? {type: "multiply"} : multiply), "_", "E"]},
    {"name": "MD", "symbols": ["MD", "_", (lexer.has("divide") ? {type: "divide"} : divide), "_", "E"]},
    {"name": "MD", "symbols": ["E"]},
    {"name": "AS", "symbols": ["AS", "_", (lexer.has("substract") ? {type: "substract"} : substract), "_", "MD"]},
    {"name": "AS", "symbols": ["AS", "_", (lexer.has("add") ? {type: "add"} : add), "_", "MD"]},
    {"name": "AS", "symbols": ["MD"]},
    {"name": "N", "symbols": ["NUMBER"]},
    {"name": "N", "symbols": [(lexer.has("fn") ? {type: "fn"} : fn), "_", "P"]},
    {"name": "NUMBER", "symbols": [(lexer.has("integer") ? {type: "integer"} : integer), (lexer.has("decimal") ? {type: "decimal"} : decimal), (lexer.has("integer") ? {type: "integer"} : integer)]},
    {"name": "NUMBER", "symbols": [(lexer.has("integer") ? {type: "integer"} : integer)]},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": d => null}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
