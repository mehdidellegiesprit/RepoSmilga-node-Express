const Task = require ('../starter/models/Task')
const asyncWrapper = require('../starter/middelware/async');
const {createCustomError} = require ('../starter/errors/custome-error')

//  First methode with async await 

const getAllTasks = asyncWrapper(async(req,res)=>{    
        // find all documents
        const tasks = await Task.find({});
        res.status(201).json({tasks})
        console.log('get all tasks with sucesss')
})


//  second methode with callback 
// const getAllTasks = (req,res)=>{    
//     // find all documents
//     const tasks =  Task.find({},function(err,doc){
//         if (err){
//             console.log('ERROR when getting docs ')
//             res.status(500).json({msg_getAllTasks:err})
//         }else{
//             res.status(201).json({doc})
//             console.log('get all tasks with sucesss')
//         }
//     });
// }
//  First methode with async await 
 const createTask = asyncWrapper(async (req,res)=>{
    // we can use callback hayka ta7tha l methode with callback  
        const task = await Task.create(req.body)
        res.status(201).json({task})     
} )


//  second methode with Callback

// const createTask =  (req,res)=>{
//     // we can use callback hayka ta7tha l methode with callback 
//     const task =  Task.create(req.body,function(err,doc){
//         if(err){
//             console.log("error when createTask")
//             res.status(500).json({msg_createTask:err})
//         }else{
//             console.log("createTask "+doc)
//             res.status(200).send(doc) 
//         }

//     }) 
// } 

//  To get A singel Task  with callBack
// const getTask =   (req,res)=>{ 
//     console.log("A singel Task ")    
//         const SingelTask =  Task.findOne({ name : req.params.id },function (err, doc) {
//            if(err){
//                 console.log("error")
//                 res.status(500).json({msg_SingelTask:err})
//             }else{
//                 console.log("adventure "+doc)
//                 res.status(200).send(doc) 
//             }
//         });    
// }





//  To get A singel Task async await 
const getTask =  asyncWrapper(async (req,res,next)=>{ 
    console.log("A singel Task ")    
        const {id:taskID} = req.params
        const task = await Task.findOne({ _id : taskID });  
        if (!task){

            // on a cree une fonction pour gerer les error of the custom
            return next(createCustomError('No task with id : '+taskID,404))
            // const error = new Error('Not found *')
            // error.status = 404
            // return next(error)
            // res.status(404).json({message :'nothing  to show / no taskID with that ID'})
        }
        console.log('task existe : '+task)        
        res.status(200).json({task})   
})

//  Update Task with callBack

// const updateTask = (req,res)=>{
//     const query = { name: '66666666666666666666666666666666666' };
//     Task.findOneAndUpdate(query, { $set: { name: 'shakeAndBake' }},   { new: false}  , function(err,doc){
//     if(err){
//         console.log("error")
//         res.status(500).json({msg_updateTask:err})
//     }else{
//         console.log("updateTask "+doc)
//         res.status(200).send(doc) 
//     }
//     })
// }

// updateTask with async await 
const updateTask = asyncWrapper(async (req,res)=>{
        const {id:taskID} = req.params
        //  update many : updateMany
        const updateTask = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new:true, // return the new item updated
            runValidators:true // to run the validators existing in the model 
        })
        if (!updateTask){
            // on a cree une fonction pour gerer les error of the custom
            return next(createCustomError('No task with id : '+taskID,404))

            // res.status(404).json({msg:"no one task to update with _id "+taskID})
        }
        res.status(200).json({updateTask})
})

//  deleteTask with async await 

// const deleteTask = async (req,res)=>{
//     const query = { name: req.params.id };
//     try {
//         //  update many : updateMany
//         const deleteTask = await Task.findOneAndRemove(query,  { new: false})
//         if (deleteTask){
//             res.status(200).json(deleteTask)
//             res.send('delete task')
//         }else{
//             res.status(404).json({"msg":"no one to delete "})
//         }
//     } catch (error) {
//         res.status(500).json({msg_deleteTask:error})
//     }    
// }


//  deleteTask with async await 

const deleteTask = asyncWrapper(async (req,res) => {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID});
        if (!task){
            console.log('no task to delete with _id'+taskID);
            // on a cree une fonction pour gerer les error of the custom
            return next(createCustomError('No task with id : '+taskID,404))
        //    return res.status(404).json({msg:"no task to delete with id : "+taskID}) ; 
        }
        res.status(200).json({success:true,task})

})


//  deleteTask with callback

// const deleteTask =  (req,res)=>{
//     const query = { name: req.params.id };
//         //  update many : updateMany
//         const deleteTask = Task.deleteMany(query,  { new: false},function(err,doc){
//             if (err){
//                 res.status(404).json({"msg_deleteTask":err})
//             }else{
//                 if (doc){
//                     res.status(200).json(doc)
//                     console.log('delete task')
//                 }else{
//                     res.status(404).json({"msg":"no one to delete "})
//                 }

//             }
//         })   
// }

const editTask = asyncWrapper(async (req,res) => {
        const {id:taskID} = req.params
        //  update many : updateMany
        const updateTask = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new:true, // return the new item updated
            runValidators:true, // to run the validators existing in the model 
            overwrite:true
        })
        if (!updateTask){
            // on a cree une fonction pour gerer les error of the custom
            return next(createCustomError('No task with id : '+taskID,404))
            // res.status(404).json({msg:"no one task to update with _id "+taskID})
        }
        res.status(200).json({updateTask})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
}