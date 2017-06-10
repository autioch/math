export default function getRandomTagIndex(str) {
  let result;
  const indices = [];
  const regex = /[em]/gi;

  while (result = regex.exec(str)) {
    indices.push(result.index);
  }

  return indices[Math.floor(Math.random() * indices.length)];
}
