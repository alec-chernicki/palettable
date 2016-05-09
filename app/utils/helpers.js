export function removeDuplicatesFrom (arrOne, arrTwo) {
  const uniqueArr = arrTwo.filter(value =>
    arrOne.map(value => value.color).indexOf(value) === -1
  )
  return uniqueArr[0];
}
