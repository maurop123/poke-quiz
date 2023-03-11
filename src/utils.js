export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function getRandomItem(arr) {
  const min = 0
  const max = arr.length
  const i = Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  return arr[i]
}
