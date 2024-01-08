/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  
  let flag = true;
  console.log(str1);
  if(str1.length!=str2.length){
    flag = false;
  }
  else{
    const one = str1.toLowerCase();
    const two = str2.toLowerCase();
    const temp = one.split("");
    console.log(temp);
    for(let i=1;i<two.length;i++){
      if(!temp.includes(two.charAt(i))){
        flag=false;
      }
    }
  }
  return flag;
}
console.log(isAnagram("School MASTER","The ClassROOM"))
module.exports = isAnagram;
