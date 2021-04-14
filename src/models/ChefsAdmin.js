const db = require('../config/db')

module.exports = {

    all(callback) {
        db.query(`SELECT * FROM chefs`,
         function(err, results) {
            if(err) throw `Database Erro! ${err}`
            callback(results.rows)
        })    
    },

    create(data, callback) {
         //inserir dados no banco de dados
         const query = `
         INSERT INTO recipes (
             chef_id,
             image,
             title,
             ingredients,
             preparation,
             information,
             created_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id
     `
         const values = [
             data.chef_id,
             data.image,
             data.title,
             data.ingredients,
             data.preparation,
             data.information,
             data.created_at
         ]
 
         db.query(query, values, function(err, results) {
                 if(err) throw `Database Erro! ${err}`
             
             callback(results.rows[0])
         })
    },
    // show
    find(id, callback) {
        db.query(`
            SELECT * FROM chefs 
            INNER JOIN recipes
            ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            `, [id], function(err, results) {
                if(err) throw `Database Erro! ${err}`
    
                callback(results.rows[0], results.rows, results.rowCount)
            })
    },

    updade(data, callback) {
            const query = `
            UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparation=($5),
            information=($6),
            created_at=($7)
            WHERE id = $8
            `
        
            const values = [
                data.chef_id,
                data.image,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                data.created_at,
                data.id
            ]

            db.query(query, values, function(err, results) {
                if(err) throw `Database Erro! ${err}`

                callback()
            })    
        },
    

}