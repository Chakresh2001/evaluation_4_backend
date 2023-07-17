const jwt = require('jsonwebtoken');
const BlackListModel = require('../model/blackList');


const Authentication = async (req,res,next)=>{

    try {

        const token = req.headers.authorization

        if(!token){
            res.status(400).json({mesa:"Login First"})
        }

        const blackListed = await BlackListModel.findOne({token:token})

        if(blackListed){
            res.status(400).json({mesa:"Token BlackListed login again"})
        }     

        jwt.verify(token, '123', function(err, decoded) {

            if(err){
                res.json({error:"invalid token"})
            }

            req.userInfo = decoded

            next()
            
        });

    } catch (error) {
        res.status(400).json({error:"Internal Error"})
    }

}

module.exports = Authentication