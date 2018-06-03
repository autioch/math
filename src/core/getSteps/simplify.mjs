import solve from '../solve';

const isArr = (obj) => Array.isArray(obj);
const isSimple = (arr) => arr.every((item) => !isArr(item));

function reduceArray(arr, newId) {
  return {
    id: newId,
    type: 'number',
    value: solve(arr),
    solvedFrom: arr.map((item) => item.id)
  };
}

export default function simplify(exp, newId) {
  let current = exp;

  while (current) {
    const tmp = current;

    current = null;

    for (let i = 0; i < tmp.length; i++) { // Check if all items are atoms.
      const item = tmp[i];

      if (isArr(item)) { // Item is subexpression
        if (isSimple(item)) { // Subexpression is simple, can be solved.
          tmp[i] = reduceArray(item, newId);

          return exp;
        }

        current = item; // Subexpression has own subexpressions.
        break;
      }
    }
  }

  return reduceArray(exp, newId);
}
