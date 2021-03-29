module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rem_list',
        {
            'id': {
                type: DataTypes.INTEGER,
                primaryKey: true,       //主键
                autoIncrement: true,
            },
            'cover_img': DataTypes.STRING,
            'name': DataTypes.STRING,
            'file_url': DataTypes.STRING,
            'type': DataTypes.STRING,
            'price':DataTypes.STRING,
            'size':DataTypes.STRING,
            'down_number': DataTypes.INTEGER,
            'file_type': DataTypes.STRING,
            'keyword': DataTypes.STRING,
            'add_time': DataTypes.STRING,
            'collect_number': DataTypes.INTEGER,
            'delete': DataTypes.INTEGER,
            'delete_time': DataTypes.INTEGER
        },
    )
}