// FIXME: This is duplicated logic
function randomIndexOf(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function removeDuplicatesFrom(arrOne, arrTwo) {
  const uniqueArr = arrTwo.filter(value =>
    arrOne.map(value => value.color).indexOf(value) === -1
  );
  // console.log(uniqueArr, arrOne, arrTwo);
  return randomIndexOf(uniqueArr);
}

export function isHex(color) {
  const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  const colorText = /#/.test(color) ? color : `#${color}`;

  return regex.test(colorText);
}
