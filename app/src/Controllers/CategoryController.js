const { orWhereExists, whereExists } = require('../database/connection');
const connection = require('../database/connection');

const csv = require('csv-parser');
const fs = require('fs');


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

    async createBySCV(request, response){

        const {file} = request.body;
        const array = [];

        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (data) => array.push(data))
            .on('end', async () => {
                console.log('CSV file successfully processed');
                console.log(array);
                var name;
                for (var i = 0; i < array.length; i++)
                {
                    name = array[i].nome;
                    await connection('category').insert({
                        name
                    });
        
                    const id = await connection('category')
                    .where('name', name)
                    .select('id')
                    .first();
        
                    console.log('Categoria criada com sucesso!', id);
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
            .where('id', array[i])
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

        console.log('Categoria deletada com sucesso!');
        return response.status(204).send();
    }

    
};