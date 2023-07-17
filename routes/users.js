const express = require('express');
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlackListModel = require('../model/blackList');

const userRoute = express.Router()


userRoute.post("/register", async(req,res)=>{

    try {
        
        const {name,email,password,gender} = req.body

        const userExsist = await UserModel.findOne({email:email})

        if(userExsist){
            res.status(400).json({error:"User Exsist"})
        }

        const user = UserModel(req.body)

        bcrypt.hash(password, 10, async function(err, hash) {
            
            user.password = hash

            await user.save()

            res.json({mesa:"User Registered", user:user})

        });

    } catch (error) {
        res.status(400).json({error:"Internal Error"})
    }

})

userRoute.post("/login", async(req,res)=>{

    try {

        const {email, password} = req.body

        const user = await UserModel.findOne({email:email})
        
        if(!user){
            res.status(400).json({error:"User does not exsist"})
        }

        bcrypt.compare(password, user.password, function(err, result) {
            
            if(!result){
                res.json({error:"invalid password"})
            }
            const token =  jwt.sign({ userID: user._id, userName:user.name }, "123");

            res.json({mesa:"user logged in", token:token})

        });
        
    } catch (error) {
        res.status(400).json({error:"Internal Error"})
    }

})

userRoute.post("/logout", async(req,res)=>{

    try {

        const token = req.headers.authorization

        if(!token){
            res.status(400).json({mesa:"Login First"})
        }

        const black = BlackListModel({token:token})

        await black.save()

        res.json({mesa:"user logged out"})
        
    } catch (error) {
        res.status(400).json({error:"Internal Error"})
    }

})

module.exports = userRoute