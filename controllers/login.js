const userDao = require('../service/operations_sql')
const md5 = require('../middlewares/md5')
const uuid = require('../middlewares/uuid')
const jwt = require('jsonwebtoken')

module.exports = {
    //前端用户登录
    postlogin: async(ctx) => {
        const {account, password} = ctx.request.body
        const user = await userDao.checkCount(account)
            // 判断用户是否存在
        if (!user) {
            // 表示不存在该用户
            ctx.body = {
                code: -1,
                message: '该用户不存在'
            };
            return;
        }
        const payload = {
            user_id: user.id,
            user_name: user.account
        };
       
         let pass = await md5.MD5(password, user.dataValues.solt);
            const token = jwt.sign(payload, "gamercode", {
                expiresIn: 3600
            });
            if(user !== null && pass == user.dataValues.password){
                ctx.body = {
                    user,
                    code: 0,
                    token
                }
            }else{
                ctx.body = {
                    code: 1,
                    message: '登陆失败'
                }
            }
        
        
    },

    verifyToken:async(token)=>{
      return  new Promise((reslove,reject)=>{
                jwt.verify(token, "gamercode",
              (err, decode)=> {
                 if (err) {  //  时间失效的时候/ 伪造的token          
                    reslove({status:false})          
                 } else {
                    reslove({status:true})          
                 }
             }
             );
        })
    }

}