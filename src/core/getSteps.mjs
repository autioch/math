import solve from './solve';
import _ from 'lodash';

const { flattenDeep } = _;
const str = (obj) => JSON.stringify(obj);
const clone = (obj) => JSON.parse(str(obj));
const isArr = (obj) => Array.isArray(obj);
const isSimple = (arr) => arr.every((item) => !isArr(item));
const serializeStep = (step) => flattenDeep(Array.isArray(step) ? step : [step]);

const getItemPaths = (item) => item.solvedFrom.map((from) => ({
  from,
  to: item.id
}));
const getStepPaths = (step) => step.filter((item) => item.solvedFrom).map((item) => getItemPaths(item));

function reduceArray(arr) {
  return {
    type: 'number',
    value: solve(arr),
    solvedFrom: arr.map((item) => item.id)
  };
}

function simplify(exp) {
  let current = exp;

  while (current) {
    const tmp = current;

    current = null;

    for (let i = 0; i < tmp.length; i++) { // Check if all items are atoms.
      const item = tmp[i];

      if (isArr(item)) { // Item is subexpression
        if (isSimple(item)) { // Subexpression is simple, can be solved.
          tmp[i] = reduceArray(item);

          return exp;
        }

        current = item; // Subexpression has own subexpressions.
        break;
      }
    }
  }

  return {
    type: 'number',
    value: solve(exp)
  };
}

export default function getSteps(exp) {
  const steps = [serializeStep(exp)];

  let current = clone(exp);

  while (isArr(current)) {
    const simplified = simplify(current);

    const flatSerialized = serializeStep(simplified);
    let nextId = Math.max(...flatSerialized.map((item) => item.id).filter((id) => !!id));

    flatSerialized.forEach((item) => {
      item.id = nextId++;
    });

    steps.push(flatSerialized);
    current = clone(simplified);
  }

  const paths = flattenDeep(steps.map((step) => getStepPaths(step)));

  return {
    steps,
    paths
  };
}
