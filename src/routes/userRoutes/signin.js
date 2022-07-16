const { User } = require('../../db/sequelize')
const  {ValidationError, UniqueConstraintError}=require("sequelize")  
//bcrypt
const bcrypt=require("bcrypt")
// fot jwt
const jwt=require("jsonwebtoken")
const privateKey=require("../../auth/private_key")

// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.post('/api/signin',(req, res) => {

    // hash password
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
     req.body.password=hash
     // create user
     User.create(req.body)
      .then(user => {


    //JWT*************************************************************
    const token=jwt.sign(
    {userId:user.id},
    privateKey,
    {expiresIn:"72h"})

        const message = `L'utilisasteur ${req.body.username} a bien été crée.`
        res.json({ message, data: user,token })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message,data:error})
        }
        if(error instanceof UniqueConstraintError){
          throw res.status(400).json({message:error.message,data:error})
        }
        const message=`L'utilisasteur  n'a pas pu être ajouté. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })  
    })
  })
}