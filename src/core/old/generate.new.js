/* eslint-disable no-underscore-dangle */
// https://github.com/cemulate/nearley-generator
import Randexp from 'randexp';
import grammar from './grammar/grammar';

function * squashLiterals(symbols) {
  let run = [];

  for (const s of symbols) {
    if (s.literal) {
      run.push(s);
    }
    if (run.length === 0) {
      yield s;
    }
    if (s.literal === undefined && run.length > 0) {
      yield {
        literal: run.map((x) => x.literal).join('')
      };
      yield s;
      run = [];
    }
  }
  if (run.length > 0) {
    yield {
      literal: run.map((x) => x.literal).join('')
    };
  }
}

function * squashNames(rules) { // eslint-disable-line no-shadow
  let run = [];
  let cname = null;

  for (const r of rules) {
    if (r.name === cname) {
      run.push(r);
    } else {
      if (cname !== null) {
        yield {
          name: cname,
          productions: run.map((x) => x.production)
        };
      }
      run = [r];
      cname = r.name;
    }
  }
  if (run.length > 0) {
    yield {
      name: cname,
      productions: run.map((x) => x.production)
    };
  }
}

function randomWeightedChoice(arr, weights) {
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
  }
  let r = Math.random() * sum;

  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r < 0) {
      return arr[i];
    }
  }

  return arr[arr.length - 1];
}

function optimize(rules) { // eslint-disable-line no-shadow
  let ret = rules
    .map((x) => ({
      name: x.name,
      production: Array.from(squashLiterals(x.symbols))
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

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

const rules = optimize(grammar.ParserRules);
const cFactor = 0.5;
const startingRule = rules.find((rule) => rule.name === 'MAIN');

function generate(rule) {
  const weights = rule.productions.map((prod) => {
    let seen = 0;

    for (const token of prod) {
      if (token.rule) {
        seen = token.rule._seen > seen ? token.rule._seen : seen;
      }
    }

    return Math.pow(cFactor, seen);
  });

  const prod = randomWeightedChoice(rule.productions, weights);

  const ret = prod.map((token) => {
    if (token.rule) {
      token.rule._seen += 1;

      const gen = generate(token.rule);

      token.rule._seen -= 1;

      return gen;
    } else if (token.literal) {
      return token.literal;
    } else if (token.regex) {
      return new Randexp(token.regex).gen();
    }
  });

  return ret.join('');
}

export default function generateCore() {
  return generate(startingRule);
}
