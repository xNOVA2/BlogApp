const mongoose = require('mongoose');

const uri = 'mongodb+srv://fanta123:fanta123@cluster0.wn29yjx.mongodb.net/';
const dbName = 'blog';



   const connect =   mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName 
    }).then(()=>{
        console.log("DATABASE HAS BEEN CONNECTED");
    })