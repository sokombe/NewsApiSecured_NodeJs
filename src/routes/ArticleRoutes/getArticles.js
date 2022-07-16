const { Article } = require('../../db/sequelize')
const {Op}=require("sequelize")  
// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.get('/api/article',auth, (req, res) => {

    if(req.query.from){
      const from= parseInt(req.query.from) 
      return Article.findAndCountAll({  //findAll renvoie la liste de total et sans donner le nombre total
        offset: from,
         limit: 5, 
        order:['id']
      })
      .then(({count,rows})=>{
        const message=`Il ya ${count} articles(s)`
        res.json({message,data:rows})
      })
    }
    else if(req.query.lng){
      const langue= req.query.lng
      return Article.findAndCountAll({  
     where:{
     langue:{
      [Op.eq]:langue
     }
     } ,
        order:['id']
      })
      .then(({count,rows})=>{
        const message=`Il ya ${count} articles(s)`
        res.json({message,data:rows})
      })
    }
    else if(req.query.cat){
      const category_id= parseInt(req.query.cat)
      return Article.findAndCountAll({  
     where:{
      category_id:{
      [Op.eq]:category_id
     }
     } ,
        order:['id']
      })
      .then(({count,rows})=>{
        const message=`Il ya ${count} articles(s)`
        res.json({message,data:rows})
      })
    }
    else if(req.query.cat&&req.query.lng){
      const category_id= parseInt(req.query.cat)
      return Article.findAndCountAll({  
        where:{
          [Op.and]:[
            {
                langue:{
                    [Op.eq]:req.query.lng
                }
            },
            {
                category_id:{
                    [Op.eq]:parseInt(req.query.cat)
                }
            }
          ]
        },
        order:['id']
      })
      .then(({count,rows})=>{
        const message=`Il ya ${count} articles(s)`
        res.json({message,data:rows})
      })
    }
    else{ // without params
      Article.findAll({
          order:['id'],

        })
      .then(articles => {
        const message = 'La liste des articles a bien été récupérée.'
        res.json({ message, data: articles })
      })
      .catch(error=>{
        const message=`La liste des articles n'a pas pu être récupérée. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })
    }

 
  })
}