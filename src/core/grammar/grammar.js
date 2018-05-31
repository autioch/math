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
    {"name": "AS", "symbols": ["AS", (lexer.has("as") ? {type: "as"} : as), "MD"]},
    {"name": "AS", "symbols": ["MD"]},
    {"name": "MD", "symbols": ["MD", (lexer.has("md") ? {type: "md"} : md), "POW"]},
    {"name": "MD", "symbols": ["POW"]},
    {"name": "POW", "symbols": ["TERM", (lexer.has("pow") ? {type: "pow"} : pow), "POW"]},
    {"name": "POW", "symbols": ["TERM"]},
    {"name": "TERM", "symbols": [(lexer.has("open") ? {type: "open"} : open), "AS", (lexer.has("close") ? {type: "close"} : close)]},
    {"name": "TERM", "symbols": ["FN"]},
    {"name": "FN", "symbols": [(lexer.has("fn") ? {type: "fn"} : fn), "TERM"]},
    {"name": "FN", "symbols": [(lexer.has("number") ? {type: "number"} : number)]}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
