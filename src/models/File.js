const db = require('../config/db')

module.exports = {
  //        req.body        
    async create(name, path) {
    //inserir dados no banco de dados
        const query = `
        INSERT INTO files (
            name,
            path
        ) VALUES ($1, $2)
        RETURNING id
        `
        const values = [
            name,              
            path      
        ]

        const id =  await db.query(query, values) 
        return id;
    },

    
}