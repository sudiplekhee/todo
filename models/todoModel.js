const makeTodoTable = (sequelize, DataTypes)=>{
    const Todo = sequelize.define("todo", {
        title : {
            type : DataTypes.STRING
        },
        description : {
            type : DataTypes.STRING
        },
        date : {
            type : DataTypes.INTEGER
        },
        status : {
            type : DataTypes.ENUM("completed","pending"),
            defaultValue : "pending"
        }
    })
    return Todo
}
module.exports = makeTodoTable