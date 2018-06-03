import simplify from './simplify';
import _ from 'lodash';

const { flattenDeep } = _;
const clone = (obj) => JSON.parse(JSON.stringify(obj));
const serializeStep = (step) => flattenDeep(Array.isArray(step) ? step : [step]);

export default function getSteps(exp) {
  const steps = [serializeStep(exp)];

  let maxId = Math.max(...steps[0].map((item) => item.id).filter((id) => !!id));
  let current = clone(exp);

  while (Array.isArray(current)) {
    maxId++;
    const simplified = simplify(current, maxId);
    const flatSerialized = serializeStep(simplified);

    steps.push(flatSerialized);
    current = clone(simplified);
  }

  return steps;
}
