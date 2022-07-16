
module.exports=(sequelize,DataTypes)=>{
return sequelize.define('Category',{
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cover:{
            type: DataTypes.STRING,
        },
        
       
    })


}