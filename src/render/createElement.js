export default function createElement(properties = {}, tagName = 'div', namespace = undefined) {
  let el;

  if (namespace === undefined) {
    el = document.createElement(tagName);
  } else {
    el = document.createElement(tagName, namespace);
  }
  Object.keys(properties).forEach((key) => el[key] = properties[key]);

  return el;
}
