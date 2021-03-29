const router = require('koa-router')(), 
    Sql = require('../service/operations_sql'),  
     md5 = require('../middlewares/md5')

router.prefix('/user')
 
router.post('/setPassword', async (ctx, next) => {
    
   
    ctx.body = 6666
})

router.post('/setPhone', async (ctx, next) => {
    let parms = ctx.request.body,
        data = await Sql.setPhone(parms);
    
    if (data[0] == 1) {
        data = {
            phone: parms.phone
        }
    }
    
    ctx.body = data
     
})

router.get('/getUser', async (ctx, next) => {
    let parms = ctx.query,
        data = await Sql.getUser(parms.id);
        
    ctx.body = data
     
})



module.exports = router;