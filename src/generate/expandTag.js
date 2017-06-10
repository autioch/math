const ONE_THIRD = 0.34;
const TWO_THIRD = 0.67;
const ONE_QUARTER = 0.25;
const TWO_QUARTER = 0.5;
const THREE_QUARTER = 0.75;

function getExpansion(char) {
  const result = Math.random();

  if (char === 'e') {
    if (result < ONE_THIRD) {
      return 'i';
    }

    if (result < TWO_THIRD) {
      return 'm*m';
    }

    return 'e-e';
  }

  if (result < ONE_QUARTER) {
    return 'i';
  }

  if (result < TWO_QUARTER) {
    return 'm+m';
  }

  if (result < THREE_QUARTER) {
    return 'e-e';
  }

  return '(e+e)';
}

module.exports = function expandTag(char) {
  return getExpansion(char).split('');
};
