const { Comment } = require('../../db/sequelize')
const  {ValidationError, UniqueConstraintError}=require("sequelize")  

// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.post('/api/comment', auth,(req, res) => {
    Comment.create(req.body)
      .then(comment => {
        const message = `Le commentaire a bien été crée.`
        res.json({ message, data: comment })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message,data:error})
        }
        if(error instanceof UniqueConstraintError){
          throw res.status(400).json({message:error.message,data:error})
        }
        const message=`Le commentaire n'a pas pu être ajouté. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })   
  })
}