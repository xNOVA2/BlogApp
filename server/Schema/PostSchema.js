const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        required:true
    },
    file:{
       data:Buffer,
       contentType:String
    },
    CreatedAt:{
        type:Date,
        default:Date.now
        }
})

module.exports  = mongoose.model('Post',PostSchema);