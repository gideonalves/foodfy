// find (id, callback) {
//     db.query (`SELECT chefs.*,
//     count(*) AS totalRecipes FROM chefs
//     LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
//     WHERE chefs.id = $1
//     GROUP BY chefs.id`, [id], function(err, results) {
//         if (err) throw `Database Error ${err}`
//         callback (results.rows[0], results.rows, results.rowCount)
//       }
//     )
//   },



//   find(id, callback) {
//     db.query (`
//     SELECT * FROM chefs
//     INNER JOIN recipes
//     ON (chefs.id = recipes.chef_id)
//     WHERE chefs.id = $1
//     `, [id], function(err, results) {
//         if (err) throw `Database Error ${err}`

//         callback (results.rows[0], results.rows, results.rowCount)

//       }
//     )
//   }