module.exports = (sequelize, DataTypes) => {
return sequelize.define('article', {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },

        author: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT

        },
        source: {
            type: DataTypes.STRING

        },
        link: {
            type: DataTypes.STRING
        },
        cover: {
            type: DataTypes.STRING
        },
        langue: {
            type: DataTypes.STRING,
            allowNull: false ,
        },

        category_id:{
        type: DataTypes.INTEGER,
        allowNull: false ,
        
        },
    

    })

}


