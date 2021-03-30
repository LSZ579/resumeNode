
    const router = require('koa-router')(),
    Sql = require('../service/operations_sql');
    const { Query } = require('mongoose');
    router.prefix('/pc')
    //获取简历列表
    router.post('/resume/list',async (ctx)=>{
        let query = ctx.request.body;
        if(query.order){
            query.order = JSON.parse(query.order);
        }
        let result = await Sql.getRemListPage(query.size,query.page,query.value,query.currentFile,query.currentResume,query.order)
        ctx.body = result;
    })

    // 获取简历详情
    router.post('/resume/detail',async (ctx)=>{
        let query = ctx.request.body;
        let result = await Sql.getResumeDetail(query.id)
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
    // 更新简历信息
    router.post('/resume/edit',async (ctx)=>{
        let query = ctx.request.body;
        let result = await Sql.resumeEdit(query);
        ctx.body = result;
    })
    // 删除简历
    router.post('/resume/delete',async (ctx)=>{
        let query = ctx.request.body;
        let result = await Sql.resumeDelete(query);
        ctx.body = result;
    })

    //查看简历次数
    router.post('/resume/addNumber',async (ctx)=>{
        let query = ctx.request.body;
        let result = await Sql.watchAdd(query.id,query.files);
        ctx.body = ctx;
    })


    // 下载简历,获取url
    router.post('/resume/preview',async (ctx)=>{
        let ip = getClientIP(ctx.request);
        console.log(ip)
        let {id} = ctx.request.body;
        let res = await Sql.previewResume(id);
        ctx.body = res;
    })

    function getClientIP(req) {
        return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
            req.headers['x-real-ip']
    };
    
    
module.exports = router