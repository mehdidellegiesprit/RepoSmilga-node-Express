const Product = require('../models/product')



const getAllProductsStatic = async (req,res)=>{
    const search = 'k'

    const products = await Product.find({price:{$gt:30}})
        .sort('name')
        .select('name price')
        .limit(10)
        .skip(5)
   
    res.status(200).json({products,nbHits:products.length})
}




const getAllProducts = async (req,res)=>{
    const { featured , company ,name , sort , fields , numericFilters} = req.query 
    const queryObject = {}
    if (featured){ // if not null 
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company){ // if not null 
        queryObject.company = company
    }
    if (name){ // if not null 
        // {$regex:name  , $options:'i'} ==> like % 

        queryObject.name = {$regex:name  , $options:'i'}
    }
    console.log('aaa',queryObject)
    // numeric fields 
    if (numericFilters){
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => '-'+operatorMap[match]+'-'
        )

        console.log('filtres ********************** ',filters)
        const options = ['price','rating']
        filters = filters.split(',').forEach((item)=>{
            const[field,operator,value] = item.split('-')
            console.log('field = ',field)
            console.log('operator = ',operator)
            console.log('value = ',value)
            if (options.includes(field)){
                queryObject[field] = { [operator] : Number(value) }
            }
            // const tab = item.split('-')
            // console.log('tab0 =  ',tab[0])
        })     
    }




    console.log('queryObject = ',queryObject)

    let result =  Product.find(queryObject)
    //  sort
    if (sort){
        const sortList = sort.split(',').join(' ') ;
        console.log('sortlist = ',sortList)
        result =result.sort(sortList) 
    }else{
        result =result.sort('createAt')
    }
    // fields
    if (fields){
        const fieldsList = fields.split(',').join(' ') ;
        console.log('fieldsList = ',fieldsList)
        result =result.select(fieldsList) 
    }    
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)

    // await lezemha tkoun louta car il va enchainer le sort avant
    //  que l find 5dem l5edma 
    const products = await result
    // can t use it in the same line because i dont know if sort allways existe or not !!!!! 
    // const products = await Product.find(queryObject).sort('name') 
    res.status(200).json({products,nbHits:products.length})

}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}