require('dotenv').config()

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require ('./products.json')

const start = async () => {
    try {
        // connnectDB
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany() ; 
        await Product.create(jsonProducts)
        console.log('Connected To the DB TRUE WITH POPULATE.js ');
        console.log('SUCCESS !!! add product from json file ') ; 
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
start()
console.log('populate.js//////////////////')

