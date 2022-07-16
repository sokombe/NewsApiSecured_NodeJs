const { Comment } = require('../../db/sequelize')
const {Op}=require("sequelize")  
// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.get('/api/comment/:id_article',auth, (req, res) => {
    const id_article=parseInt(req.params.id_article)
      Comment.findAll({
        where:{
            id_article:{
            [Op.eq]:id_article
           }
           },
          order:['id'],
        })
      .then(comment => {
        const message = 'La liste des commentaires a bien été récupérée.'
        res.json({ message, data: articles })
      })
      .catch(error=>{
        const message=`La liste des commentaires n'a pas pu être récupérée. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })
  })
}