import parse from './parse';
import rawToRnp from './rawToRnp';
import rnpTree from './rnpTree';
import rnpCalculator from './rnpCalculator';

export default function calculator(expression) {
  const parsed = parse(expression);
  const rnp = rawToRnp(parsed);
  return {
    raw: expression,
    parsed: parsed,
    value: rnpCalculator(rnp),
    tree: rnpTree(rnp)
  };
}
