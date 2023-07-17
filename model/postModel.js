const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({

    title:{type:String, required:true},
    body:{type:String, required:true},
    device:{type:String,  enum:["PC", "TABLET", "MOBILE"] , required:true},
    

})


const PostModel = mongoose.model("Post", PostSchema)

module.exports = PostModel