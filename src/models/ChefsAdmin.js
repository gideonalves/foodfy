const db = require('../config/db')

module.exports = {
    // INDEX
    all(callback) {
        db.query(`SELECT * FROM chefs`,
         function(err, results) {
            if(err) throw `Database Erro! ${err}`
            callback(results.rows)
        })    
    },

    findAllChefsCountRecipes(callback) {
        db.query(`
        SELECT c.id, c.name,count(r.id) AS total_recipes,c.avatar_url
        FROM chefs c
        INNER JOIN recipes r
        ON c.id = r.chef_id
        GROUP BY c.id,c.name,c.avatar_url 
        ORDER BY c.name ASC
        `, function(err, results) {
            if(err) throw `Database Erro! ${err}`
            callback(results.rows)
        })
    },

    // POST
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
    find(id, callback){
        
        db.query( `
            SELECT chefs.*,
            count(recipes.chef_id) AS totalRecipes FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`, [id], function(err, results) {
                if (err) return res.send("Database Erro!")

                callback(results.rows[0])
        })
    }, 
    
    findRecipes(id, callback) {
        db.query(`
            SELECT r.* FROM chefs as c 
            LEFT JOIN  recipes as r
            ON c.id = r.chef_id
            WHERE c.id = $1  
            `,[id], function(err, results) {
                if (err) return res.send("Database Erro!")

                callback(results.rows)
        })
    },

    findById(id, callback) {
        db.query( `
        SELECT chefs.*,
        count(*) AS totalRecipes FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], function(err, results) {
            if (err) return res.send("Database Erro!")

            callback(results.rows[0])
        })
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

    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Erro! ${err}` // throw = lançar
    
            return callback()
        })
    }, 
    

}


  