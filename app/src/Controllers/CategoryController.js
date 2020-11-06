const connection = require('../database/connection');

module.exports = {

    async index(request, response){
    
        const category = await connection('category').select('*');
    
        console.log(category);
        return response.json();
    },

    async create(request, response){
        const { name } = request.body;

        await connection('category').insert({
            name
        });

        const id = await connection('category')
        .where('name', name)
        .select('id')
        .first();

        console.log('Categoria criada com sucesso!', id);
        return response.status(200).send();
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('category').where('id', id).delete();

        console.log('Categoria deletada com sucesso!');
        return response.status(204).send();
    }

    
};