import { Parser, Grammar } from 'nearley';
import compile from 'nearley/lib/compile';
import generate from 'nearley/lib/generate';
import nearleyGrammar from 'nearley/lib/nearley-language-bootstrapped';
import source from './source.ne.js';

function sourceToScript(sourceCode) {
  // Parse the grammar source into an AST
  const grammarParser = new Parser(nearleyGrammar);

  const { results: [grammarAst] } = grammarParser.feed(sourceCode);

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {});

  // Generate JavaScript code from the rules
  return generate(grammarInfoObject, 'grammar');
}

function sourceToJS(grammarJs) {
  const module = { // eslint-disable-line no-shadow
    exports: {}
  };

  eval(grammarJs); // eslint-disable-line no-eval

  return Grammar.fromCompiled(module.exports);
}

function compileGrammar(sourceCode) {
  const grammarJs = sourceToScript(sourceCode);

  return sourceToJS(grammarJs);
}

export default compileGrammar(source);
