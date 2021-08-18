const compute = (n1, n2, callback) => callback(n1, n2) ;{
    console.log('compute2')
}
const sum = (n1, n2) => n1 + n2;{
    console.log('sum')
}
const product = (n1, n2) => n1 * n2;{
    console.log('product')
}

console.log(compute(5, 3, sum));     // ↪️  8
console.log(compute(5, 3, product)); // ↪️  15

// ***************************************************************************************************

//  second methode with Callback
// const task = (req,res)=>{
//     Task.create(req.body)
//     res.status(201).json( req.body ) 
//     let affich = ()=>{
//         console.log('mri9el')
//     }
//     affich()
    
//  } 
// const createTask =  (req,res)=>{
//     // we can use callback
//      task(req,res)
//      console.log('end createTask')
        
// } 