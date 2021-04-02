
    const router = require('koa-router')(),
    Sql = require('../service/operations_sql');
    const com = require('../controllers/login');
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
        console.log(ctx.request)
        let query = ctx.request.body,collect = '';
        let result = await Sql.getResumeDetail(query.id)
        let status =await verifyToken(query.token);
        if(status){
            collect = await Sql.checkCollect(query.user_id,query.id)
        }
        ctx.body = {
            result,
            collect
        };
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
        let query = ctx.request.body;
        let status =await verifyToken(query.token);
        if(!status){
            ctx.body = throwError()
            return
        }
        let result = await Sql.watchAdd(query.id,'down_number');
        let res = await Sql.previewResume(query.id);
        ctx.body = res;
    })


    // 用户收藏简历
    router.post('/resume/collect',async (ctx)=>{
        let query = ctx.request.body,user_id = query.user_id,resume_id = query.resume_id;
        let status =await verifyToken(query.token);
        if(!status){
            ctx.body = throwError()//登录超时
            return
        }
        let collect = await Sql.checkCollect(user_id,resume_id)
        if(collect){
            // 存在收藏记录  则更新记录就好了
            let collectStatus = collect.dataValues.status==1?0:1;
            var addNumber = await Sql.watchAdd(resume_id,'collect_number');
            let updateStatus = await Sql.updateCollectStatus(user_id,resume_id,collectStatus);
            ctx.body = updateStatus;
            return
        }
        let addCollect = await Sql.userAddCollect(user_id,resume_id);
        let result = await Sql.watchAdd(resume_id,'collect_number');
        ctx.body = addCollect;
    })

    router.post('/resume/checkCollect',async (ctx)=>{
        let query = ctx.request.body;
        let res = await Sql.checkCollect(query.user_id,query.resume_id);
        ctx.body = res;
    })

    function verifyToken(token) {
        return  com.verifyToken(token)
    }
    function throwError(){
        return {
            code: 10001,
            err:'您还未登录或登录已超时，请重新登录'
        }
    }
    function getClientIP(req) {
        return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
            req.headers['x-real-ip']
    };
    
    
module.exports = router