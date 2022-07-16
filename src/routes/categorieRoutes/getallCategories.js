const { Category } = require('../../db/sequelize')
const {Op}=require("sequelize")  
// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.get('/api/category',auth, (req, res) => {
      Category.findAll({
          order:['id'],
        })
      .then(Category => {
        const message = 'La liste des catégories a bien été récupérée.'
        res.json({ message, data: articles })
      })
      .catch(error=>{
        const message=`La liste des catégories n'a pas pu être récupérée. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })

 
  })
}