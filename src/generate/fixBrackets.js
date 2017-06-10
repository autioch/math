export default function fixBrackets(expression) {
  return expression
    .replace(/e\(/gi, 'e+(')
    .replace(/\)e/gi, ')+e')
    .replace(/i\(/gi, 'i+(')
    .replace(/\)i/gi, ')+i')
    .replace(/m\(/gi, 'm+(')
    .replace(/\)\(/gi, ')+(')
    .replace(/\)m/gi, ')+m');
}
