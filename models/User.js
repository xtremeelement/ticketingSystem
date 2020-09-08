
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            uniqie: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return User;
}