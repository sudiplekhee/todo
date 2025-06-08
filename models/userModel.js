const makeuserModel = (sequelize, Datatypes) => {
    const user =sequelize.define ('user', {
        name: {
            type: Datatypes.STRING
        },
        email: {
            type: Datatypes.STRING
        },
        password: {
            type: Datatypes.STRING
        }
    })
    return user
}
module.exports=makeuserModel