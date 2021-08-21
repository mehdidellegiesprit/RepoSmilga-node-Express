require('dotenv').config()

// au lieu async wrapper (try/catch) ==> the same but a ready package 
require('express-async-errors')
const express = require('express')
const app = express()
 // require the absolute path to .env
 const path = require('path');
 require('dotenv').config({ path: path.resolve(__dirname, './.env') });


const notFoundMiddelware = require('./middleware/not-found')
const errorMiddelware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// middelware
app.use(express.json())

// route

app.get('/',(req,res)=>{
    res.send('<h1>Store API </h1> <a href="/api/v1/products"> products route </a> ')
})
// products route 
app.use('/api/v1/products',productsRouter)

 app.use(notFoundMiddelware)

 // that is error-handler
 app.use(errorMiddelware)



const port = process.env.PORT || 3000 

 const start = async () => {
     try {
         // connnectDB
         await connectDB(process.env.MONGO_URI)
         console.log('Connected To the DB TRUE ');
         app.listen(port,console.log('server is listening port '+port))
     } catch (error) {
         console.log(error);
     }
 }

start()
