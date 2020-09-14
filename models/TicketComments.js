
module.exports = function (sequelize, DataTypes) {
    let Ticketcomments = sequelize.define("Ticketcomments", {
        ticket_id: {
            type: DataTypes.INTEGER,
            allowNull: false,            
        },
        ticket_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        user_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },        
    })

    return Ticketcomments;
}