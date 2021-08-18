const express = require('express')
const app = express()
const tasks = require('../routes/tasks')
const connectedDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middelware/not-found')
const errorHandlerMiddelware = require('./middelware/error-handler')

//midelware
app.use(express.static('./public'))
app.use(express.json())

   
//routes

app.use('/api/v1/tasks',tasks)

 
app.use(notFound)
app.use(errorHandlerMiddelware)




const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectedDB(process.env.MONGO_URI) 
        console.log('Connected To the DB TRUE ');
        app.listen(port,console.log('server is listening on port  '+port+' ....... ')) 
    } catch (error) {
        console.log(error);
    }
}     

start()


// const compute = (n1, n2, callback) => callback(n1, n2) ;{
//     console.log('compute2')
// }
// const sum = (n1, n2) => n1 + n2;{
//     console.log('sum')
// }
// const product = (n1, n2) => n1 * n2;{
//     console.log('product')
// }

// console.log(compute(5, 3, sum));     // ↪️  8
// console.log(compute(5, 3, product)); // ↪️  15

// // ***************************************************************************************************






