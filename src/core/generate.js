import unparse from 'nearley/lib/unparse';
import grammar from './grammar/grammar';

export default function generate(complexity = 1) {
  return unparse(grammar, 'MAIN', complexity);
}
