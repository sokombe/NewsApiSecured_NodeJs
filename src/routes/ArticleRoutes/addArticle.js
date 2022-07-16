const { Article } = require('../../db/sequelize')
const  {ValidationError, UniqueConstraintError}=require("sequelize")  

// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.post('/api/article', auth,(req, res) => {
    Article.create(req.body)
      .then(article => {
        const message = `L'article ${req.body.name} a bien été crée.`
        res.json({ message, data: article })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message,data:error})
        }
        if(error instanceof UniqueConstraintError){
          throw res.status(400).json({message:error.message,data:error})
        }
        const message=`L'article  n'a pas pu être ajouté. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })   
  })
}