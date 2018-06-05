/* eslint-disable no-underscore-dangle */
// https://github.com/cemulate/nearley-generator
import { randomWeightedChoice, squashLiterals, squashNames } from './util.js';
import RandExp from 'randexp';

export default class NearleyGenerator {
  constructor(nearleyGrammar) {
    this.rules = this.optimize(nearleyGrammar.ParserRules);
    this._cFactor = 0.5;
  }

  optimize(rules) { // eslint-disable-line class-methods-use-this
    let ret = rules.map((x) => ({
      name: x.name,
      production: Array.from(squashLiterals(x.symbols))
    }));

    ret = ret.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });

    ret = Array.from(squashNames(ret));

    for (const rule of ret) {
      rule.productions = rule.productions.map((prod) => prod.map((token) => {
        if (typeof token === 'string') {
          return {
            rule: ret.find((x) => x.name === token)
          };
        }
        if (token instanceof RegExp) {
          return {
            regex: token
          };
        }

        return token;
      }));
      rule._seen = 0;
    }

    return ret;
  }

  generate(symbol, convergence) {
    this._cFactor = convergence;

    return this._generate(this.rules.find((x) => x.name == symbol));
  }

  _generate(rule) {
    const weights = rule.productions.map((prodRule) => {
      let seen = 0;

      for (const token of prodRule) {
        if (token.rule) {
          seen = token.rule._seen > seen ? token.rule._seen : seen;
        }
      }

      return Math.pow(this._cFactor, seen);
    });

    const prod = randomWeightedChoice(rule.productions, weights);

    const ret = prod.map((token) => {
      if (token.rule) {
        token.rule._seen += 1;
        const gen = this._generate(token.rule);

        token.rule._seen -= 1;

        return gen;
      }

      if (token.literal) {
        return token.literal;
      }

      if (token.regex) {
        return new RandExp(token.regex).gen();
      }

      return '';
    });

    return ret.join('');
  }
}
