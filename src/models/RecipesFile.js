const db = require('../config/db')

module.exports = {
  //        req.body        
    async create(idRecipe, idFile) {
    //inserir dados no banco de dados
        const query = `
        INSERT INTO recipe_files (
            recipe_id,
            file_id
        ) VALUES ($1, $2)
        RETURNING id
        `
        const values = [
            idRecipe,              
            idFile      
        ]

        const id =  await db.query(query, values) 
        return id;
    },

    
}