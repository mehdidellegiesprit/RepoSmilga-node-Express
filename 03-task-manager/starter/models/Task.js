const mongoose = require ('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,'must provide name'],
        trim:true, // trim efface les  espace melouwel w le5er
        maxlength:[20,'name au max 20 ']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Task',TaskSchema)