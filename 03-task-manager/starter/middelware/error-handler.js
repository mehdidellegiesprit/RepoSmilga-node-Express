const {CustomAPIError} = require (('../errors/custome-error') )
const erroHandlerMiddelware = (err,req,res,next) =>{
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:"somthing went wrong try again ",error:err})
}

module.exports = erroHandlerMiddelware