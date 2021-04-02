module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rem_collect',
        {
            'id': {
                type: DataTypes.INTEGER,
                primaryKey: true,       //主键
                autoIncrement: true,
            },
            'add_time': DataTypes.STRING,
            'resume_id': DataTypes.STRING,
            'user_id': DataTypes.INTEGER,
            'status': DataTypes.INTEGER
        },
    )
}