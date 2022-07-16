const { Category } = require('../../db/sequelize')
const  {ValidationError,UniqueConstraintError}=require("sequelize")  
  
// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => { 
  app.put('/api/category/:id',auth,(req, res) => {
    const id = req.params.id
    Category.update(req.body, {
      where: { id: id }
    })
    .then(_ => { 
   return  Category.findByPk(id).then(cat => {
        if(cat===null){
            const message=`Le pokémon démandé n'existe pas  Réessayer avec un autre identifiant.`
            return  res.status(404).json({message,data:error})      
        }
        const message = `L'article ${cat.title} a bien été modifié.`
        res.json({message, data: cat })
      })

    })
    .catch(error=>{
      if(error instanceof ValidationError){
        return res.status(400).json({message:error.message,data:error})
      }
      if(error instanceof UniqueConstraintError){
        throw res.status(400).json({message:error.message,data:error})
      }
        const message=`L'article n'a pas pu être modifié. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })
  })
}