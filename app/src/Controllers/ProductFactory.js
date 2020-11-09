const ProductController = require('./ProductController');
const CategoryController = require('./CategoryController');
const Product_CategoryController = require('./Product_CategoryController');
const { exist } = require('./CategoryController');

module.exports = {

    async index(request, response){

        const { sortCommand } = request.params;
        const products = await ProductController.index(sortCommand);

        var data = ('\nProducts: ' + '\n');
        var aux = '';
        var j = 0;

        for (var i = 0; products[i]!=undefined ; i++)
        {
            data = data.substr(0,data.length)+"\n"+('ID: ' + products[i].id + ' - ' + products[i].name + ' R$' + products[i].value + '\n     Description: ' + products[i].description + '\n          Categories: ');
            aux = products[i];
            for ( ; products[i]!=undefined && aux.id == products[i].id; i++)
            {
                j = i+1;
                if(products[j]!=undefined && products[j].id == aux.id){
                    data = data.substr(0,data.length) + (products[i].category + ' - ');
                }else{
                    data = data.substr(0,data.length) + (products[i].category);
                }
            }
            i--;
            data = data.substr(0,data.length)+'\n';
        }
        return response.status(201).send(data);
    },

    async createProduct(request, response){

        const { name, description, value } = request.body;

        if(!isNaN(value) == false){
            return response.status(400).send('\n     Error! The "value" field must be a number.');
        }
        var exist = await ProductController.verifyIfExist(name, description, value);

        if (exist == 0)
        {
            try{
                const { category } = request.params;
                var array = category.split(",");
            } 
            catch(error){
                const string = (error.name + ":" + error.message);
                return response.status(400).send(string);
            }

            const categoryExist = await CategoryController.exist(array);

            if(categoryExist == 0)
            {
                return response.status(400).send('\n     One of the categories entered does not exist!\n     Product not created.');
            }
            else{
                try{
                    const product_id = await ProductController.create(name, description, value);
                    await Product_CategoryController.create(product_id, array);
                    return response.status(201).send('\n     Product create successful! ID: '+product_id);
                }
                catch{
                    return response.status(400).send('\n     Error! Typed category does not exist or does not follow the model: id1,id2,id3...\n     Product not created.');
                }
            }
        } else
        {
            return response.status(400).send('\n     Error! The product already exists.\n     Product not created.');
        }
    },

    async exist(request, response){
        const { id } = request.params;
        ProductController.verifyIfExistById(id).then(promise => {
            if (promise == '1'){
                return response.status(200).send();
            }
            else {
                return response.status(400).send();
            }
        });
    },

    async delete(request, response){
        
        const { id } = request.params;
        const exist = await ProductController.verifyIfExistById(id);

        if (exist == 1){
            try{
                await ProductController.delete(id);
                await Product_CategoryController.deleteProduct(id);
                const message = '\n     Product delete successfull!';
                return response.status(200).send(message);
            }
            catch(error){
                const erro = (error.name + ":" + error.message);
                return response.status(400).send(erro);
            }
        }else{
            return response.status(400).send('\n     Product not found.');
        }
    },

    async update(request, response){

        const {id, newName, newDescription, newValue} = request.body;

        if(!isNaN(newValue) == false){
            const erro = '\n     Error! The "newValue" field must be a number.';
            return response.status(400).send(erro);
        }

        const exist = await ProductController.verifyIfExistById(id);

        if (exist == 1){
            try{
                const { newCategories } = request.params;
                var array = newCategories.split(",");
            } 
            catch(error){
                const erro = (error.name + ":" + error.message)
                return response.status(400).send(erro);
            }

            const categoryExist = await CategoryController.exist(array);

            if(categoryExist == 0)
            {
                const erro = '\n     One of the categories entered does not exist!\n     Product not updated.';
                return response.status(400).send(erro);
            }
            else{
                try{
                    await ProductController.update(id,newName,newDescription,newValue);
                    await Product_CategoryController.deleteProduct(id);
                    await Product_CategoryController.create(id, array);
                    return response.status(201).send('\n     Product updated successful!');
                }
                catch{
                    return response.status(400).send('\n     Error! Typed category does not exist or does not follow the model: id1,id2,id3...\n     Product not updated.');
                }
            }
        }else{
            return response.status(400).send('\n     Product not found.');
        }
    }

}