const db = require('../config/db')

module.exports = {

    all(callback) {
        db.query(`
        SELECT recipes.*, chefs.name
        FROM recipes
        INNER JOIN chefs ON (recipes.chef_id = chefs.id)`,
         function(err, results) {
            if(err) throw `Database Erro! ${err}`
            callback(results.rows)
        })    
    },

    find(id, callback) {
        db.query(`
            SELECT * 
            FROM recipes
            WHERE recipes.id = $1`, [id], function(err, results) {
                if(err) throw `Database Erro! ${err}`
    
                callback(results.rows[0])
            })
    }, 

    findAllByTitle(filter,callback) {
        db.query(`
        SELECT r.*, c.name FROM recipes r
        INNER JOIN chefs c
        ON c.id = r.chef_id	
        WHERE r.title LIKE '%${filter}%'`, function(err, results) {
                if(err) throw `Database Erro! ${err}`
    
                callback(results.rows)
            })
    },

    paginate(params) {
        const { filter, limit, offset, callback } = params // destruturando do params

        let query = `
        SELECT recipes.*,chefs.name, (SELECT COUNT (re.id) FROM recipes re) AS totaPages FROM recipes
         INNER JOIN chefs ON (recipes.chef_id = chefs.id)
         
        `
        if ( filter ) {
            query = `%${query}%
             WHERE recipes.title ILIKE '%${filter}%' 
            `        
        }
        query = `${query} 
        ORDER BY recipes.title ASC
         LIMIT $1 OFFSET $2 
            
        `

        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Database Erro! ${err}`
    
            callback(results.rows)
        })
    },
    findOneByChef(id_chef, callback){
        db.query(`
        SELECT * FROM recipes r
        WHERE r.chef_id = $1`,[id_chef], function(err, results) {
                if(err) throw `Database Erro! ${err}`
    
                callback(results.rows)
            })

    }

}