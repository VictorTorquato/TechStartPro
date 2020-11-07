const connection = require('../database/connection');

const csv = require('csv-parser');
const fs = require('fs');


module.exports = {

    async index(request, response){
    
        const category = await connection('category').select('*');

        var data = ('\nCategories: ' + '\n');

        for (var i = 0; i < category.length ; i++)
        {
            data = data.substr(0,data.length)+"\n"+(category[i].id + ' - ' + category[i].name);
        }
        console.log(data);
        return response.status(200).send();
    },

    
    async indexProducts(request, response){

        const { categoryId } = request.params;
        var { categoryName } = '';

        const exist = await connection('category')
            .select()
            .where('id', '=', categoryId)
            .then(function(rows) {
                if (rows.length===0) {
                    // no matching records found
                    return(0);
                } else {
                    // return or throw - duplicate name found
                }
            });

        if(exist == 0)
            {
                console.log("\n     The inserted category doesn't exist!");
                return response.status(400).send();
            }
            else{
                categoryName = await connection('category')
                .select('name')
                .where('category.id', '=', categoryId);

                const products = await connection.select([
                    'product.id', 
                    'product.name', 
                    'product.description',
                    'product.value'
                ])
                .orderBy('product.id')
                .table('product')
                .innerJoin('product_category', 'product_category.product_id', 'product.id')
                .where('product_category.category_id', '=', categoryId);
                
                var data = ('\nProducts of the category: ' + categoryName[0].name + '\n');
                for (var i = 0; i < products.length ; i++)
                {
                    data = data.substr(0,data.length)+"\n"+(products[i].id + ' - ' + products[i].name + ' R$' + products[i].value);
                }

                console.log('         ', data);
                return response.status(200).send(data);
            }
    },

    async create(request, response){
        const { name } = request.body;

        const [id] = await connection('category').insert({
            name
        });

        console.log('\n     Category create successful! ID:', id);
        return response.status(200).send();
    },

    async createBySCV(request, response){
        
        const {file} = request.body;
        const array = [];

        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (data) => array.push(data))
            .on('end', async () => {
                await connection('category').delete();
                var name;
                var id;
                for (var i = 0; i < array.length; i++)
                {
                    name = array[i].nome;
                    [id] = await connection('category').insert({
                            name
                    }).select('id');
            
                    console.log('\n     Category ', array[i].nome, 'create successful! ID:', id);
                    }
            });
        return response.status(200).send();
    },

    async exist(array){
        var exist = 1;
        for (var i = 0; i < array.length || exist == 1; i++)
        {
            exist = await connection('category')
            .select()
            .where('id', '=', array[i])
            .then(function(rows) {
                if (rows.length===0) {
                    // no matching records found
                    return(0);
                } else {
                    // return or throw - duplicate name found
                }
            });
        };
        return(exist);
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('category').where('id', id).delete();

        console.log('\n     Category delete successful!');
        return response.status(204).send();
    }

};