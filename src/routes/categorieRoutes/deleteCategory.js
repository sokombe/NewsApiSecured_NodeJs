const { Category } = require('../../db/sequelize')

// for authorization
const auth=require("../../auth/auth")
  
module.exports = (app) => {
  app.delete('/api/category/:id',auth, (req, res) => {
    Category.findByPk(req.params.id).then(cat => {
      if(cat===null){
        const message=`La catégorie démandée n'existe pas  Réessayer avec un autre identifiant.`
      return  res.status(404).json({message,data:error}) 
      }
      const categoryDeletede = cat;
     return  Category.destroy({
        where: { id: cat.id }
      })
      .then(_ => {
        const message = `La catégorie avec l'identifiant n°${categoryDeletede.id} a bien été supprimé.`
        res.json({message, data: categoryDeletede })
      })  
    })
    .catch(error=>{
      const message=`L'articles n'a pas pu être supprimé. Réessayer dans quelques  instants.`
      res.status(500).json({message,data:error})
    })
  })
}