const router = require('koa-router')(),
Sql = require('../service/operations_sql');
const com = require('../controllers/login');
const { Query } = require('mongoose');
router.prefix('/pc')

// 添加简历模板
router.post('/add_html_resume',async (ctx)=>{
    let query =  ctx.request.body;
    let res = await Sql.addResumeModule(query.html,query.keyword,query.title,query.css_url);
    ctx.body = res;
})

// 更新简历模板
router.post('/edit_html_resume',async (ctx)=>{
    let query =  ctx.request.body;
    let res = await Sql.updateResumeModule(query.id,query.html,query.keyword,query.title,query.css_url);
    ctx.body = res;
})

// 获取简历模板列表
router.post('/get_html_resume',async (ctx)=>{
    let query = ctx.request.body;
    let res = await Sql.getResumeModuleList(query.size,query.page,query.value)
    ctx.body = res;
})

// 获取详情 params：id
router.post('/html_resume_deatil',async (ctx)=>{
    let query = ctx.request.body;
    let res = await Sql.get_html_resume(query.id)
    ctx.body = res;
})

// 获取文章详情 params：id
router.post('/add_post_watch',async (ctx)=>{
    let query = ctx.request.body;
    let res = await Sql.add_post_watch(query.id)
    ctx.body = res;
})
module.exports = router