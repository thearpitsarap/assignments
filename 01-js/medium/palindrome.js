/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const tempstr = str.toLowerCase().replace(/ /g,"");

  if(str.length==0){
    return true;
  }

  for (let i = 0; i < str.length; i++) {
    if (tempstr.charAt(i)!=tempstr.charAt(tempstr.length-i-1)){
      return false;
    }
  }

  return true;
}

console.log(isPalindrome("A man a plan a canal Panama"));

module.exports = isPalindrome;
