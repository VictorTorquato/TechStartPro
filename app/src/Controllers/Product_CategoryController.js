const connection = require('../database/connection');
const { index } = require('./CategoryController');

module.exports = {

async index(request,response){
    const pc = await connection('product_category').select('*');
    console.log(pc);
    return(response.json());
},

async create( product_id, categoriesIdArray){

    var category_id;
    
    for (var i = 0; i < categoriesIdArray.length; i++){
        category_id = categoriesIdArray[i];
        try{
            await connection('product_category').insert({
                product_id,
                category_id
            });
        }catch{
            break;
        }
    }
},

async deleteProduct(ProductId){
    try{
        await connection('product_category').where('product_id', ProductId).delete('*');
    }
    catch(error){
        console.log(error);
    }
},

}