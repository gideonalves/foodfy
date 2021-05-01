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
            WHERE id = $1`, [id], function(err, results) {
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
    }
 

}