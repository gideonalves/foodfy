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
         INSERT INTO chefs (
             name,
             avatar_url,
             created_at            
         ) VALUES ($1, $2, $3)
         RETURNING id
     `
         const values = [
             data.name,
             data.avatar_url,
             data.created_at
         ]
 
         db.query(query, values, function(err, results) {
                 if(err) throw `Database Erro! ${err}`
             
             callback(results.rows[0])
         })
    },
    // show
    find (id, callback) {
        db.query (`SELECT chefs.*,
        count(*) AS totalRecipes FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], function(err, results) {
            if (err) throw `Database Error ${err}`
            callback (results.rows[0], results.rows, results.rowCount)
          }
        )
      },

    updade(data, callback) {
            const query = `
            UPDATE chefs SET
            name=($1),
            avatar_url=($2),
            created_at=($3)                        
            WHERE id = $4
            `        
            const values = [
                data.name,
                data.avatar_url,              
                data.created_at,
                data.id
            ]

            db.query(query, values, function(err, results) {
                if(err) throw `Database Erro! ${err}`

                callback()
            })    
    },
    

}