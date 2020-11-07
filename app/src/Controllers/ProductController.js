const connection = require('../database/connection');

module.exports = {

    // SortCommands:
    // 1 - OrderBy product.id; 
    // 2 - OrderBy product.name;
    // 3 - OrderBy product.value;

    async index(sortCommand){ 

        var products;

        switch(sortCommand){
            case 1:
                products = await connection
                .select([
                    'product.id', 
                    'product.name', 
                    'product.description',
                    'product.value',
                    'category.name as category',
                ])
                .orderBy('product.id')
                .table('product')
                .innerJoin('product_category', 'product_category.product_id', 'product.id')
                .innerJoin('category', 'category.id', 'product_category.category_id')
                break;
            case 2:
                products = await connection
                .select([
                    'product.id', 
                    'product.name', 
                    'product.description',
                    'product.value',
                    'category.name as category',
                ])
                .orderBy('product.name')
                .table('product')
                .innerJoin('product_category', 'product_category.product_id', 'product.id')
                .innerJoin('category', 'category.id', 'product_category.category_id')
                break;
            case 3:
                products = await connection
                .select([
                    'product.id', 
                    'product.name', 
                    'product.description',
                    'product.value',
                    'category.name as category',
                ])
                .orderBy('product.value')
                .table('product')
                .innerJoin('product_category', 'product_category.product_id', 'product.id')
                .innerJoin('category', 'category.id', 'product_category.category_id')
                break;
            default:
                    console.log('\n     Error! Invalid sort command.');   
        }
        return(products);
    },

    async create(name, description, value){

        const [ id ] = await connection('product').insert({
            name,
            description,
            value
        }).select('id');

        return(id);
    },

    async verifyIfExist(name, description, value){
            const exist = await connection('product')
            .select()
            .where('name', '=', name)
            .where('description', '=', description)
            .where('value', '=', value)
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
        .where('id', '=', id)
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
            await connection('product').where('id', '=', id).delete('*');
        }
        catch(error){
            console.log(error.name + ":" + error.message);
        }
        return;
    },

    async update(id, newName, newDescription, newValue){
        try{
            await connection('product').where('id', '=', id).update({
                name: newName,
                description: newDescription,
                value: newValue
            });
        }
        catch(error){
            console.log(error.name + ":" + error.message);
        }
        return;
    }

    
};