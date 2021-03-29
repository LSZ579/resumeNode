module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rem_order',
        {
            'id': {
                type: DataTypes.INTEGER,
                primaryKey: true,       //主键
                autoIncrement: true,
            },
            'rem_id': DataTypes.STRING,
            'user_id': DataTypes.STRING,
            'file_url': DataTypes.STRING,
            'rem_price': DataTypes.STRING,
            'add_time': DataTypes.INTEGER,
            'delete': DataTypes.INTEGER,
            'delete_time': DataTypes.INTEGER
        },
    )
}