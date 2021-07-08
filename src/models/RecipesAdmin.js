const db = require('../config/db')
const { date } = require('../lib/utils')

module.exports = {
    // Home
    all(callback) {
            db.query(`
            SELECT recipes.id, recipes.title,chefs.name
            FROM recipes
            INNER JOIN chefs
            ON recipes.chef_id = chefs.id`,
                function (err, results) {
                    if (err) throw `Database Erro! ${err}`

                    callback(results.rows)
                })
        },
    

    //        req.body        
    async create(data) {
        //inserir dados no banco de dados
        const query = `
         INSERT INTO recipes (
             chef_id,
             title,
             ingredients,
             preparation,
             information,
             created_at
         ) VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id
         `
        const values = [
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]
        const id = await db.query(query, values)
        return id;
    },
    //show
    // find(id, callback) {
    //     db.query(`
    //         SELECT * FROM recipes
    //         WHERE id = $1`, [id], function (err, results) {
    //         if (err) throw `Database Erro! ${err}`

    //         callback(results.rows[0])
    //     })
    // },
    async find(id) {
        // const queryRecipes = ` SELECT * FROM recipes

        const queryRecipes = ` SELECT * FROM recipes
        WHERE id = $1`
        const queryFiles = ` SELECT files.* FROM recipes 
        INNER JOIN recipe_files 
        ON recipes.id = recipe_files.recipe_id
        INNER JOIN files 
        ON files.id = recipe_files.file_id
        WHERE recipes.id = $1`

        const value = [id]
        const recipe = await db.query(queryRecipes, value)
        const files = await db.query(queryFiles, value)
        const results = {
            recipe:recipe.rows[0],
            files: files.rows
        }
        return results
    },

    // async chefSelectOptions(id) {
    //     const queryChef = ` SELECT * FROM chefs WHERE id = $1`  
    //     const value = [id]
    //     const chef = await db.query(queryChef, value)

    //      const results = {
    //         chef: chef.rows[0]
    //     }
    // },

    chefSelectOptions(callback) {
        db.query(`
            SELECT * FROM chefs`,
            function (err, results) {
                if (err) throw `Database Erro! ${err}`

                callback(results.rows)
            }
        )
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

        db.query(query, values,
            function (err, results) {
                if (err) throw `Database Erro! ${err}`

                callback()
            }
        )
    },

    delete(id, callback) {
        db.query(`
            DELETE FROM recipes 
            WHERE id = $1`, [id],
            function (err, results) {
                if (err) throw `Database Erro! ${err}` // throw = lançar

                return callback()
            }
        )
    },
 

    findByChef(id) {
        // try{
        return db.query(`
            SELECT * FROM recipes 
            WHERE chef_id = $1
             `, [id]
        )
        // } catch(error) {
        //     throw error
        // }
    }

}