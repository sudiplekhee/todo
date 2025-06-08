const makeBlogTable = (sequelize, DataTypes) => {
    const Blog =sequelize.define('Blog', {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        subtitle: {
            type: DataTypes.STRING
        }

    })
    return Blog
}
module.exports = makeBlogTable


