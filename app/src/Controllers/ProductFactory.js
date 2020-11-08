const ProductController = require('./ProductController');
const CategoryController = require('./CategoryController');
const Product_CategoryController = require('./Product_CategoryController');

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

        console.log(data);

        return response.status(201).send(data);
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
        const exist = await ProductController.verifyIfExistById(id);

        if (exist == 1){
            try{
                await ProductController.delete(id);
                await Product_CategoryController.deleteProduct(id);
                console.log('\n     Product delete successfull!');
            }
            catch(error){
                console.log(error.name + ":" + error.message);
            }
        }else{
            console.log('\n     Product not found.');
            return response.status(400).send();
        }

        return response.status(204).send();
    },

    async update(request, response){

        const {id, newName, newDescription, newValue} = request.body;

        if(!isNaN(newValue) == false){
            console.log('\n     Error! The "newValue" field must be a number.')
            return response.status(400).send();
        }

        const exist = await ProductController.verifyIfExistById(id);

        if (exist == 1){
            try{
                const { newCategories } = request.params;
                var array = newCategories.split(",");
            } 
            catch(error){
                console.log(error.name + ":" + error.message);
                return response.status(400).send();
            }

            const categoryExist = await CategoryController.exist(array);

            if(categoryExist == 0)
            {
                console.log('\n     One of the categories entered does not exist!')
                console.log('\n     Product not updated.');
                return response.status(400).send();
            }
            else{
                try{
                    await ProductController.update(id,newName,newDescription,newValue);
                    await Product_CategoryController.deleteProduct(id);
                    await Product_CategoryController.create(id, array);
                    console.log('\n     Product updated successful!');
                    return response.status(201).send();
                }
                catch{
                    console.log('\n     Error! Typed category does not exist or does not follow the model: id1,id2,id3...')
                    console.log('\n     Product not updated.');
                    return response.status(400).send();
                }
            }
        }else{
            console.log('\n     Product not found.')
            return response.status(400).send();
        }
    }

}