const fs = require("fs")

fs.readFile('read.txt', 'utf8', function(err, data){ 
    console.log(data); 
}); 

for(let i=0;i<10000;i++){
    console.log(i)
}