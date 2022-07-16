const { Category } = require('../../db/sequelize')
const  {ValidationError, UniqueConstraintError}=require("sequelize")  

// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.post('/api/Category', auth,(req, res) => {
    Category.create(req.body)
      .then(category => {
        const message = `La categorie ${req.body.title} a bien été crée.`
        res.json({ message, data: category })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message,data:error})
        }
        if(error instanceof UniqueConstraintError){
          throw res.status(400).json({message:error.message,data:error})
        }
        const message=`La categorie  n'a pas pu être ajouté. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })   
  })
}