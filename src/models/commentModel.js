const user=require("./userModel")
const article=require('./articleModel')

module.exports=(sequelize,DataTypes)=>{
   return sequelize.define('comment',{
        content:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        id_article:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        id_user:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
    })

 
}