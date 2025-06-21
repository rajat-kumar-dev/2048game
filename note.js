function reverseString(str) {
  // write your code below
  const strArr = str.split('');
  let left = 0;
  let right = strArr.length - 1;
  for (let i = 0; i < strArr.length / 2; i++) {
    let temp = strArr[left];
    strArr[left] = strArr[right];
    strArr[right] = temp;
    left++;
    right--;
  }
  return strArr.join('');
}

console.log(reverseString('Hello'));
