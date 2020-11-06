const connection = require('../database/connection');

const ProductController = require('./ProductController');
const CategoryController = require('./CategoryController');
const Product_CategoryController = require('./Product_CategoryController');

module.exports = {

    async index(request, response){

        const products = await ProductController.index(3);

        dataArray = new Array();

        var i = 0;
        var j = 0;
        var k = 0;
        var l = 0;

        for (i ; products[i]!=undefined ; i++)
        {
            dataArray[k] = {
                id: 0,
                name: '',
                description: '',
                value: 0,
                category: []
            };
            dataArray[k].id = products[i].id;
            dataArray[k].name = products[i].name;
            dataArray[k].description = products[i].description;
            dataArray[k].value = products[i].value;
            l = 0;
            j = dataArray[k].id;

            for (j ; products[i]!=undefined && j == products[i].id  ; i++)
            { 
                dataArray[k].category[l] = products[i].category;
                l++;
            }
            i--;
            k++;
        }

        console.log(dataArray);

        return response.json(dataArray);
    },

    async createProduct(request, response){
        const { name, description, value} = request.body;

        if(!isNaN(value) == false){
            console.log('\n     Error! The "value" field must be a number.')
            return response.status(400).send();
        }
        var exist = await ProductController.verifyIfExist(name, description, value);

        if (exist == 0)
        {
            try{
                const { category } = request.params;
                var array = category.split(",");
            } 
            catch(error){
                console.log(error.name + ":" + error.message);
                return response.status(400).send();
            }

            const categoryExist = await CategoryController.exist(array);

            if(categoryExist == 0)
            {
                console.log('\n     One of the categories entered does not exist!')
                console.log('\n     Product not created.');
                return response.status(400).send();
            }
            else{
                try{
                    const product_id = await ProductController.create(name, description, value);
                    await Product_CategoryController.create(product_id, array);
                    console.log('\n     Product create successful! ID: ', product_id);
                    return response.status(201).send();
                }
                catch{
                    console.log('\n     Error! Typed category does not exist or does not follow the model: id1,id2,id3...')
                    console.log('\n     Product not created.');
                    return response.status(400).send();
                }
            }
        } else
        {
            console.log('\n     Error! The product already exists.')
            console.log('\n     Product not created.');
            return response.status(400).send();
        }
    },

    async delete(request, response){
        const { id } = request.params;

        exist = await ProductController.verifyIfExistById(id);
        if (exist == 1){
            try{
                await ProductController.delete(id);
                await Product_CategoryController.deleteProduct(id);
                console.log('\n     Product delete successfull!');
            }
            catch(error){
                console.log(error);
            }
        }else{
            console.log('\n     Product not found.');
        }

        return response.status(204).send();
    },

    // async ()


}

