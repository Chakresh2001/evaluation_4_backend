const mongoose = require('mongoose');


const BlackListSchema = mongoose.Schema({

    token : {type:String}

})


const BlackListModel = mongoose.model("BlackList", BlackListSchema)

module.exports = BlackListModel