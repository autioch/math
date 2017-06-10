export default function replaceAllTags(expression) {
  let result = '';
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === 'i' || char === 'e' || char === 'm') {
      result += Math.round(Math.random() * 10) + 2;
    } else {
      result += char;
    }
  }
  return result;
}
