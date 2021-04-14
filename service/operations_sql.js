
const { rem_user,rem_list,rem_order,rem_keyword,rem_collect,rem_postlist  } = require('../models/index');

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
    // 查询简历列表
    static async getRemListPage(count=10,page=1,value='',file_type='',type='',orders) {
        let rank = [['watch', 'DESC'],['down_number', 'DESC'],['id', 'DESC'],['id', 'DESC']];
        console.log(type,file_type)
        return await rem_list.findAndCountAll({
            attributes: { exclude: ['file_url'] },//隐藏该字段
            where: {
                [Op.or]: {
                    keyword: {
                        [Op.like]: '%' + value + '%'
                    },
                    name: {
                        [Op.like]: '%' + value + '%'
                    },
                },
                [Op.and]: {
                    type:{
                        [Op.like]: '%' + type + '%'
                    },
                    file_type:{
                        [Op.like]: '%' + file_type + '%'
                    }
                }
            },
            'order': [
                rank[orders]||['watch', 'DESC']
            ],
            limit: count,
            raw: true,
            offset: count * (page - 1),
        }).then(res => {
            return res;
        })
    }

    // 获取简历详情
    static async getResumeDetail(id){
        return await rem_list.findOne({
            attributes: {exclude:['file_url']},
            where:{id}
        })
    }

 //查询关键字列表
static async getKeywordList(value= ''){
    return await rem_keyword.findAll({
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

// 更新简历
static async resumeEdit(query){
    let id = query.id;
    delete query.id;
    return await rem_list.update(
        {...query},
        {
            where: {
                id
            }
     })
}

// 删除简历
static async resumeDelete(query){
    let id = query.id;
    return await rem_list.destroy(
        {
            where: {
                id
            }
     })
}

// 获取下载地址
static async previewResume(id){
    return await rem_list.findOne({
        attributes:['file_url'],
        where: {
           id
        }
    })
}

// 查看次数递增
static async watchAdd(id,files='watch'){
    let res = await rem_list.findOne({
        where:{id}
    })
    let num = res.increment(files);
    if(num) return 1;
}

static async decrementFiles(id,files='collect_number'){
    let res = await rem_list.findOne({
        where:{id}
    })
    let num = res.decrement(files);
    if(num) return 1;
}

// 查询账号是否存在
static async checkCount(account) {
    return await rem_user.findOne({
        where: {
            account
        }
    })
}

// 注册
static async userRegister(query,pass){
    return await rem_user.create({
        slot:query.password,
        password: pass,
        user_name: query.user_name,
        account: query.account,
        add_time:nowTime
    })
}

// 获取用户信息
static async getUserInfo(id){
    return await rem_user.findOne({
        attributes: { exclude: ['slot','password',] },//隐藏该字段
        where:{
            id
        }
    })
}

// 用户收藏简历
static async checkCollect(user_id,resume_id){
    return await rem_collect.findOne({
        where:{
            resume_id,
            user_id
        }
    })
}

// 更新简历收藏状态
static async updateCollectStatus(user_id,resume_id,status) {
    return await rem_collect.update(
        {
            status: status
        },
      {
        where:{
            user_id,
            resume_id
        }
      }
    )
}

// 用户收藏简历
static async userAddCollect(user_id,resume_id){
    let user = await rem_user.findOne({where:{id: user_id}})
    if(!user) return {code:-1,err:'用户不存在'}
    return await rem_collect.create({
        resume_id,
        user_id,
        add_time:nowTime
    })
}

// 检查是否收藏
static async checkCollect(user_id,resume_id){
    return await rem_collect.findOne({
       where:{
        resume_id,
        user_id
       }
    })
}

// ----------------------------------------------------------
// 添加文章
static async addPost(title,content,desc,type=1){
    return await rem_postlist.create({
        title,
        content,
        desc,
        type,
        add_time:nowTime
    })
}

// 更新文章
static async updatePost(id,title,content,desc){
    return await rem_postlist.update(
        {
            content,
            title,
            desc
        },
      {
        where:{
            id
        }
      })
}

// 获取文章列表
static async getPostList(count=10,page=1,value='',order =1) {
    let orders = [['watch','desc'],['id','desc']]
    return await rem_postlist.findAndCountAll({
        where: {
            [Op.or]: {
                title: {
                    [Op.like]: '%' + value + '%'
                }
            }
        },
        limit: count,
        order:[orders[order]],
        raw: true,
        offset: count * (page - 1),
    }).then(res => {
        return res;
    })
}

// 获取文章详情
static async getPostDetail(id){
    return await rem_postlist.findOne({
        where:{
            id
        }
    })
}

// 阅读文章
static async add_post_watch(id) {
    let res = await rem_postlist.findOne({
        where:{id}
    })
    let num = res.increment('watch');
    return num;
}

}

module.exports = Sql;
