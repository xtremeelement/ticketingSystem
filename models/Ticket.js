
module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,            
        },
        ticket_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        short_description: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        long_description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    return Ticket;
}