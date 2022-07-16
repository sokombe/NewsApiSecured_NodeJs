const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 

module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('user',{
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false ,
            validate:{
              notEmpty:{msg:"Le nom ne peut pas être vide..."},
              notNull:{msg:"Le nom est une propietés requise."},
              max:{
                args:[25],
                msg: "La taille du nom doit  varier entre 1 à 25 caractères."
              }
            }
          },
          
        email:{
          type: DataTypes.STRING,
          allowNull:false,
          unique:{
              msg:"L'adresse mail est déjà prise par un autre utilisateur."
            },
            validate:{
              notEmpty:{msg:"L'adresse mail ne peut pas être vide..."},
              notNull:{msg:"L'email est une propietés requise."},
              isEmail: {
                msg: "Adresse email male formaté."
              },
            }
      },
          password: {
            type: DataTypes.STRING,
            allowNull: false ,   
            validate:{
              notEmpty:{msg:"Le nom ne peut pas être vide..."},
              notNull:{msg:"Le nom est une propietés requise."},
            }     
          },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
              notEmpty:{msg:"Le numéro de téléphone ne peut pas être vide..."},
              notNull:{msg:"Le téléphone est une propietés requise."},
              validator: function(v) {
                return phoneValidationRegex.test(v); 
            }
            } 

        },
    })


}



