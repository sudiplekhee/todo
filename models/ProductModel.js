
const makeProductModel=(sequelize,DataTypes)=>{
    const Product=sequelize.define("Product",{
        title:{
            type:DataTypes.STRING
        },
          sub:{
            type:DataTypes.INTEGER
        },
          description:{
            type:DataTypes.STRING
        }
    })
    return Product
}
module.exports=makeProductModel