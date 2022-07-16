const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const favicon=require("serve-favicon")
//import the db
const sequelize=require("./src/db/sequelize")
// in dev mode
const morgan=require("morgan")


// instance of express
const app=express()

// set port
const port=process.env.PORT || 7000

// middleware
app
.use(favicon(__dirname +"/favicon.ico"))
.use(morgan("dev"))
.use(bodyParser.json())
.use(cors())

// init db 
sequelize.initDb()

// Différents points de terminaisons ICI:

// 0. The root end-point
app.get("/",(req,res)=>{
    res.json(`Hello dear user 👋! Welcome to our secured News Api!!!`)
})

  // 1. user 
 //login
 require("./src/routes/userRoutes/login")(app)
 //signin
 require("./src/routes/userRoutes/signin")(app)

 // 2. articles
 //add article
 require("./src/routes/ArticleRoutes/addArticle")(app)
 //get articles
 require("./src/routes/ArticleRoutes/getArticles")(app)
 // get by pk
 require("./src/routes/ArticleRoutes/findArticleByPk")(app)
 // update article
 require("./src/routes/ArticleRoutes/updateAricle")(app)
 // Delete
 require("./src/routes/ArticleRoutes/deletArticle")(app)

// 3. catory
// create
require("./src/routes/categorieRoutes/addCategory")(app)
// get all
require("./src/routes/categorieRoutes/getallCategories")(app)
// update
require("./src/routes/categorieRoutes/updateCategory")(app)
// delete
require("./src/routes/categorieRoutes/deleteCategory")(app)

// 4. comment
// create comment
require("./src/routes/commentRoutes/addComment")(app)
// get all aticle comments
require("./src/routes/commentRoutes/allArticleComments")(app)



// 404 end_point
// Errors Handling
// 404
app.use(({res})=>{
    const message="Impossible  de trouver la ressource  demandée ! Vous pouvez essayer une autre URL."
    res
    .status(404)
    .json(message)
    })

    // lauch api
    app.listen(port,()=>console.log(`Notre Application tourne sur: http://localhost:${port}`))






