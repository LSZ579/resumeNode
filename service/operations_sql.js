
const { rem_user,rem_list,rem_order,rem_keyword  } = require('../models/index');

const { Op } = require('sequelize');

    var date = new Date((new Date()).getTime());
    let Y,M,D,h,m,s;
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    let nowTime = Y+M+D+h+m+s;
// class 一个类 构造函数  类的静态方法
class Sql {
    // 登陆
    static async getRemListPage(count,page,value='') {
        return await rem_list.findAndCountAll({
            attributse: ['keyword', 'name'],
            where: {
                [Op.or]: {
                    keyword: {
                        [Op.like]: '%' + value + '%'
                    },
                    name: {
                        [Op.like]: '%' + value + '%'
                    }
                }
            },
            limit: count,
            raw: true,
            offset: count * (page - 1),
        }).then(res => {
            return res;
        })
    }
 //查询关键字列表
static async getKeywordList(value= ''){
    return await rem_keyword.findAll({
        attributse: ['key'],
        where: {
            [Op.or]: {
                key: {
                   [Op.like]: '%'+value+'%'
                }
            }
        }
    })
}

// 添加关键字
static async addKeyword(name,type=0){
    return await rem_keyword.create({
        key:name,
        type
    })
}

// 删除关键字
static async deleteKeyword(id){
    return await rem_keyword.destroy({
        where:{
            id
        }
    })
}
// 添加简历
static async resumeAdd(query){
    return await rem_list.create({
        ...query,
        add_time:nowTime
    })
}

}

module.exports = Sql;
