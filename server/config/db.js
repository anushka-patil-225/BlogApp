const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


mongoose.connect("mongodb+srv://anushkapatil566:Blog@cluster0.pog7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log(err);
})