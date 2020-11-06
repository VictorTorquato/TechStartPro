const connection = require('../database/connection');

module.exports = {

    async index(){
        
        const product = await connection
        .select([
            "product.id", 
            "product.name", 
            "product.description",
            "product.value",
            "category.name as category1",
        ])
        .table('product')
        .innerJoin('product_category', 'product_category.product_id', 'product.id')
        .innerJoin('category', 'category.id', 'product_category.category_id')

        console.log(product);

        return(product);
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

    async delete(id){
        try{
            await connection('product').where('id', id).delete();

            return('\nProduct delete successfull!');
        }
        catch{
            return('\nProduct not found.');
        }
    }

    
};