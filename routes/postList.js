const router = require('koa-router')(),
Sql = require('../service/operations_sql');
const com = require('../controllers/login');
const { Query } = require('mongoose');
router.prefix('/pc')

// 添加范文
router.post('/add_post',async (ctx)=>{
    console.log('add_post')
    let query =  ctx.request.body;
    let res = await Sql.addPost(query.title,query.content,query.desc);
    ctx.body = res;
})

// 更新文章
router.post('/edit_post',async (ctx)=>{
    console.log('add_post')
    let query =  ctx.request.body;
    let res = await Sql.updatePost(query.id,query.title,query.content,query.desc);
    ctx.body = res;
})

// 获取文章列表
router.post('/post_list',async (ctx)=>{
    let query = ctx.request.body;
    let res = await Sql.getPostList(query.size,query.page,query.value,query.type)
    ctx.body = res;
})

// 获取文章详情 params：id
router.post('/post_deatil',async (ctx)=>{
    let query = ctx.request.body;
    let res = await Sql.getPostDetail(query.id)
    ctx.body = res;
})

// 获取文章详情 params：id
router.post('/add_post_watch',async (ctx)=>{
    let query = ctx.request.body;
    let res = await Sql.add_post_watch(query.id)
    ctx.body = res;
})
module.exports = router