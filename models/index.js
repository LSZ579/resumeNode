const Sequelize = require('../config/mysql_sequelize');

// 通过导入的 Sequelize 得到七张表
const rem_user = Sequelize.sequelize.import(__dirname + '/rem_user.js'),
rem_list = Sequelize.sequelize.import(__dirname + '/rem_list.js'),
rem_order = Sequelize.sequelize.import(__dirname + '/rem_order.js'),
rem_keyword = Sequelize.sequelize.import(__dirname+'/rem_keyword'),
rem_collect = Sequelize.sequelize.import(__dirname+'/rem_collect'),
rem_postlist = Sequelize.sequelize.import(__dirname+'/rem_postlist'),
rem_make = Sequelize.sequelize.import(__dirname+'/rem_make');


module.exports = { rem_user, rem_list,rem_order,rem_keyword,rem_collect,rem_postlist,rem_make};
