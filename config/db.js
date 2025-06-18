const{Sequelize, DataTypes}=require("sequelize")
require("dotenv").config()
 
const sequelize=new Sequelize({
    database:process.env.db_name,
    username:process.env.db_username,
    port:process.env.db_port,
    host:process.env.db_host,
    dialect:"mysql",
    password:process.env.db_password
})
sequelize.authenticate()
.then(()=>{
    console.log("connected succesfully")
})
.catch((err)=>{
    console.log("Not connected okay")
})
 const db={}
db.blogs=require("../models/BlogModel")(sequelize,DataTypes)
db.users=require("../models/userModel")(sequelize,DataTypes)
db.products=require("../models/ProductModel")(sequelize,DataTypes)
db.todos = require("../models/todoModel")(sequelize,DataTypes)

//yesto relation xa [Foreign key]
db.users.hasMany(db.todos)
db.todos.belongsTo(db.users)

sequelize.sync({alter:true})
.then(()=>{
    console.log("Migrated successfully")
})
module.exports = sequelize
module.exports=db

