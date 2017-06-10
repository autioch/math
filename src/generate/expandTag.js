export default function expandTag(char) {
  const result = Math.random();

  if (char === 'e') {
    if (result < 0.34) {
      return 'i';
    }

    if (result < 0.67) {
      return 'm*m';
    }

    return 'e-e';
  }

  if (result < 0.25) {
    return 'i';
  }

  if (result < 0.5) {
    return 'm+m';
  }

  if (result < 0.75) {
    return 'e-e';
  }

  return '(e+e)';
}
