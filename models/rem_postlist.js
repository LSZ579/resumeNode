module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rem_postlist',
        {
            'id': {
                type: DataTypes.INTEGER,
                primaryKey: true,       //主键
                autoIncrement: true,
            },
            'title': DataTypes.STRING,
            'content': DataTypes.STRING,
            'type': DataTypes.STRING,
            'desc': DataTypes.STRING,
            'add_time': DataTypes.INTEGER
        },
    )
}