const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("Sahil Rand")
})

app.listen("3000",()=>{
    console.log("Started");
})