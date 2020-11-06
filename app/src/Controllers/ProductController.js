const knexfile = require('../../knexfile');
const connection = require('../database/connection');

module.exports = {

    async index(){
        
        const products = await connection
        .select([
            'product.id', 
            'product.name', 
            'product.description',
            'product.value',
            'category.name as category',
        ])
        .table('product')
        .innerJoin('product_category', 'product_category.product_id', 'product.id')
        .innerJoin('category', 'category.id', 'product_category.category_id')

        return(products);
    },

    async create(name, description, value){

        await connection('product').insert({
            name,
            description,
            value
        });

        const product = await connection('product')
        .where('name', name)
        .select('id')
        .first()

        return(product.id);
    },

    async verifyIfExist(name, description, value){
            const exist = await connection('product')
            .select()
            .where('name', name)
            .andWhere('description', description)
            .andWhere('value', value)
            .then(function(rows) {
                if (rows.length===0) {
                    // no matching records found
                    return('0');
                } else {
                    // return or throw - duplicate name found
                    return('1');
                }
            });
            return(exist);
    },

    async verifyIfExistById(id){
        const exist = await connection('product')
        .select()
        .where('id', id)
        .then(function(rows) {
            if (rows.length===0) {
                // no matching records found
                return(0);
            } else {
                // return or throw - duplicate name found
                return(1);
            }
        });
        return(exist);
    },

    async delete(id){
        try{
            await connection('product').where('id', id).delete('*');
        }
        catch(error){
            console.log(error);
        }
        return;
    }

    
};