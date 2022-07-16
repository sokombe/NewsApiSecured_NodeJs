const { Sequelize, DataTypes } = require('sequelize')
//for hash
const bcrypt=require("bcrypt")

// import models
const ArticleModel = require('../models/articleModel')
const CommentModel=require("../models/commentModel")
const CategoryModel=require("../models/categoryModel")
const UserModel = require('../models/userModel')
//... others models.... 


// connexion à la bd
const sequelize = new Sequelize(
    "newsDb",// db name
    "postgres", //sgbd userName
    "lenovot430", //sgbd pw
    {
        host:"localhost",
        dialect:"postgres", // Driver name
        dialectOptions:{
            timezone:"Etc/GMT-2"
        },
        logging:false
    }
)

// we authentificate   or check the connexion with the db
sequelize.authenticate()
.then( ()=>{
    console.log("Connected")
} )
.catch(err=>{
    console.log("error: "+err)
})

 // we call all model before for sync with sequelize
const Article = ArticleModel(sequelize, DataTypes)
const  Comment=CommentModel(sequelize,DataTypes)
const Category= CategoryModel(sequelize,DataTypes)
const User=UserModel(sequelize,DataTypes)
// const an other model....

const initDb = () => {
    // we sync with the db all models
  return sequelize.sync({force: false}).then(_ => { 
    // after we can perfor other actions

    /* bcrypt.hash("Lenovot430/@",10)
    .then(hash=>{
        User.create({
            username:"gogo sokombe",
            email:"gogosokombe1@gmail.com",
            password:hash ,
            phone:"34567890"
          })
          .then(user=>{

          })
    }) */
  

    // here we add pokémons for test
/*     pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp, 
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon =>{
        console.log(pokemon.toJSON())
      }) 
    }) 

    // we add new user for test
    bcrypt.hash("lenovot430",10) // we crypt password
    .then(hash=>{
       User.create({
      username:"gogosokombe1@gmail.com",
      password:hash 
    })
    .then(user=> console.log(user.toJSON()))

    } ) */
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
   // to use in the app.js for init db
  initDb,
  
   Article,
   Category,
   Comment,
   User
}