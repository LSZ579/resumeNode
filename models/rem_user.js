module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rem_user',
        {
            'id': {
                type: DataTypes.INTEGER,
                primaryKey: true,       //主键
                autoIncrement: true,
            },
            'user_name': DataTypes.INTEGER,
            'avatar': DataTypes.STRING,
            'password': DataTypes.STRING,
            'account': DataTypes.STRING,
            'delete': DataTypes.DOUBLE,
            'delete_time': DataTypes.DOUBLE,
            'slot': DataTypes.STRING,
            'add_time': DataTypes.STRING
        },
    )
}