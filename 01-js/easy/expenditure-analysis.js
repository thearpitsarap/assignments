/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let set = new Set();
  let arr = [];
  let tempObj;
  for(let i=0;i<transactions.length;i++){
    set.add(transactions[i].category);
  }
  set.forEach((ele)=>{
    let temp = 0;
    for(let i=0;i<transactions.length;i++){
      if(transactions[i].category==ele){
        temp+=transactions[i].price;
      }
    }
    tempObj = {};
    tempObj["category"]=ele;
    tempObj["totalSpent"]=temp;
    arr.push(tempObj)
    temp=0;
  })
  return arr;
}

module.exports = calculateTotalSpentByCategory;
