const { Article } = require('../../db/sequelize')
 
// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.get('/api/article/:id',auth,(req, res) => {
    Article.findByPk(req.params.id)
      .then(article => {
        if(article===null){
          const message=`L'article démandé n'existe pas  Réessayer avec un autre identifiant.`
        return  res.status(404).json({message,data:error}) 
        }
        const message = 'Un article a bien été trouvé.'
        res.json({ message, data: article })
      })
      .catch(error=>{
        const message=`L'article n'a pas pu être récupéré. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })
  }) 
}