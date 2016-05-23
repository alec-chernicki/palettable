// FIXME: This is duplicated logic
function randomIndexOf (arr) {
  let randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

export function removeDuplicatesFrom (arrOne, arrTwo) {
  const flattenedArr = arrOne.map(value => value.color)

  console.log('flattened', flattenedArr);
  console.log('dataarr:', arrTwo)
  const uniqueArr = arrTwo.filter(value =>
    arrOne.map(value => value.color).indexOf(value) === -1
  )
  // console.log(uniqueArr, arrOne, arrTwo);
  return randomIndexOf(uniqueArr)
}
