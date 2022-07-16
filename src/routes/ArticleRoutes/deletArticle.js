const { Article } = require('../../db/sequelize')

// for authorization
const auth=require("../../auth/auth")
  
module.exports = (app) => {
  app.delete('/api/article/:id',auth, (req, res) => {
    Article.findByPk(req.params.id).then(article => {
      if(article===null){
        const message=`L'article démandé n'existe pas  Réessayer avec un autre identifiant.`
      return  res.status(404).json({message,data:error}) 
      }
      const articleDeleted = article;
     return  article.destroy({
        where: { id: article.id }
      })
      .then(_ => {
        const message = `L'article avec l'identifiant n°${articleDeleted.id} a bien été supprimé.`
        res.json({message, data: articleDeleted })
      })  
    })
    .catch(error=>{
      const message=`L'articles n'a pas pu être supprimé. Réessayer dans quelques  instants.`
      res.status(500).json({message,data:error})
    })
  })
}