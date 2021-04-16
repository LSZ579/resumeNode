module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rem_make',
        {
            'id': {
                type: DataTypes.INTEGER,
                primaryKey: true,       //主键
                autoIncrement: true,
            },
            'html': DataTypes.STRING,
            'title': DataTypes.STRING,
            'keyword': DataTypes.STRING,
            'add_time': DataTypes.STRING,
            'watch':DataTypes.INTEGER,
            'css_url':DataTypes.INTEGER,
        },
    )
}