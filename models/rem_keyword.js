module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rem_keyword',
        {
            'id': {
                type: DataTypes.INTEGER,
                primaryKey: true,       //主键
                autoIncrement: true,
            },
            'key': DataTypes.STRING,
            'type': DataTypes.STRING,
            'delete': DataTypes.INTEGER
        },
    )
}