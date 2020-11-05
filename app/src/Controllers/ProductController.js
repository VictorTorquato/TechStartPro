const connection = require('../database/connection');

module.exports = {

    async index(request, response){
    
        const product = await connection('product').select('*');
    
        console.log(product);
        return response.json();
    },

    async create(request, response){
        const { name, description, value } = request.body;

        await connection('product').insert({
            name,
            description,
            value
        });

        const id = await connection('product')
        .where('name', name)
        .select('id')
        .first();

        console.log('Produto criado com sucesso!', id);
        return response.status(200).send();
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('product').where('id', id).delete();

        console.log('Produto deletado com sucesso!');
        return response.status(204).send();
    }

    
};