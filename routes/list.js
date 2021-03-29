
    const router = require('koa-router')(),
    Sql = require('../service/operations_sql');
    const { Query } = require('mongoose');
    router.prefix('/pc')

    router.post('/resume/list',async (ctx)=>{
        let query = ctx.request.body;
        let result = await Sql.getRemListPage(query.size,query.page,query.value='')
        ctx.body = result;
    })

    // 查询关键字
    router.get('/keyword/search',async (ctx)=>{
        let query = ctx.query;
        let result = await Sql.getKeywordList(query.value)
        ctx.body = result;
    })
    //添加关键字
    router.post('/keyword/add',async (ctx)=>{
        let query = ctx.request.body;
        // if(!query.name) throw console.error();
        let result = await Sql.addKeyword(query.name,query.type)
        ctx.body = result;
    })

    //删除关键字
    router.post('/keyword/delete',async (ctx)=>{
        let query = ctx.request.body;
        let result = await Sql.deleteKeyword(query.id);
        ctx.body = result;
    })

    // 添加简历
    router.post('/resume/add',async (ctx)=>{
        let query = ctx.request.body;
        let result = await Sql.resumeAdd(query);
        ctx.body = result;
    })
module.exports = router