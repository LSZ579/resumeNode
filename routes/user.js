const router = require('koa-router')(), 
    Sql = require('../service/operations_sql'),  
     md5 = require('../middlewares/md5');
    const com = require('../controllers/login');
     const uuid = require('../middlewares/uuid');
     const jwt = require('jsonwebtoken');
router.prefix('/pc')
 
router.post('/setPassword', async (ctx, next) => {
    ctx.body = 6666
})

// 注册
router.post('/user/register', async (ctx, next) => {
    let parms = ctx.request.body;
    let user = await Sql.checkCount(parms.account);
    if (user) {
        ctx.body = {
            code: -1,
            message: '邮箱已经被注册'
        };
        return;
    }
    let pass = await md5.MD5(parms.password),
    data = await Sql.userRegister(parms,pass);
    ctx.body = data 
})

router.get('/user/getUserInfo', async (ctx, next) => {
    let parms = ctx.query,
        data = await Sql.getUserInfo(parms.id);
         ctx.body = data
})

// 校验token是否有效
router.post('/user/verifyToken',async (ctx)=>{
    let token = ctx.request.body.token;
        com.verifyToken(token).then(res=>{
        ctx.body = res;
        })
//     let token = ctx.request.body.token;
//     let sta = jwt.verify(token, "gamercode",
//    await function (err, decode) {
//         if (err) {  //  时间失效的时候/ 伪造的token          
//             // ctx.body = {'status':0};            
//         } else {
//             // ctx.body = {'status':1};
//         }
//     }
//     );

})


// 登录
router.post('/user/login',async (ctx)=>{
    const {account, password} = ctx.request.body;
    const user = await Sql.checkCount(account)
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
   
     let pass = await md5.MD5(password);
     console.log(pass)
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
})


module.exports = router;