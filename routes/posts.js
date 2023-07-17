const express = require('express');
const Authentication = require('../middleware/Authentication');
const UserModel = require('../model/userModel');
const PostModel = require('../model/postModel');


const postRoute = express.Router()



// posting route is not mentioned thus i am using the posts/add route to make user posts data

postRoute.post("/add", Authentication, async(req,res)=>{

    try {

        const {title, body, device} = req.body
        

        const post = PostModel(req.body)
        await post.save()

        
        res.json({message:"post added", post:post})
        
    } catch (error) {
        res.status(400).json({error:"Internal Error"})
    }

})

postRoute.get("/get", Authentication, async(req,res)=>{

   
       try {
        const posts = await PostModel.find()
        res.json({posts:posts})
       } catch (error) {
        res.json({error:"invalid"})
       }
        
  
})
postRoute.get("/get/:id", Authentication, async(req,res)=>{

   
       try {
        const {id} = req.params

        const post  = await PostModel.findById(id)

        res.json({post:post})

       } catch (error) {
        res.json({error:"invalid"})
       }
  
})

postRoute.patch("/update/:id", Authentication, async(req,res)=>{    

    try {
        const {id} = req.params

        const updatedPost = await PostModel.findByIdAndUpdate(id, req.body)
    
        res.json({message:"post updated"})
    } catch (error) {
        res.status(400).json({error:"Internal Error"})
    }


})


postRoute.delete("/delete/:id", Authentication, async(req,res)=>{    

    try {
        const {id} = req.params

        const updatedPost = await PostModel.findByIdAndDelete(id)
    
        res.json({message:"post deleted"})
    } catch (error) {
        res.status(400).json({error:"Internal Error"})
    }


})


module.exports = postRoute