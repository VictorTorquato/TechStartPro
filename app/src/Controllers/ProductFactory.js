const connection = require('../database/connection');

const ProductController = require('./ProductController');
const Product_CategoryController = require('./Product_CategoryController');

module.exports = {

    index(request, response){

        const product = ProductController.index();
        return response.json(product);
    },

    async createProduct(request, response){
        const { name, description, value} = request.body;

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

            try{
                const product_id = await ProductController.create(name, description, value);
                await Product_CategoryController.create(product_id, array);
                console.log('Product create successful! ID: ', product_id);
                return response.status(201).send();
            }
            catch{
                console.log('\nError! Typed category does not exist or does not follow the model: id1,id2,id3...')
                console.log('\nProduct not created.');
                return response.status(400).send();
            }
        } else
        {
            console.log('\nError! The product already exists.')
            console.log('\nProduct not created.');
            return response.status(400).send();
        }
    },

    delete(request, response){
        const { id } = request.params;

        message = ProductController.delete(id);
        Product_CategoryController.deleteProduct(id);

        console.log(message);
        return response.status(204).send();
    },


}

