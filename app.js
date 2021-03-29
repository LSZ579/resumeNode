const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const passport = require('./middlewares/passport')
const jwt = require('jsonwebtoken')

const koajwt = require('koa-jwt')
const addToken = require('./middlewares/token')

const cors = require('koa2-cors') // 处理跨域
const uuid = require('./middlewares/uuid')
const md5 = require('./middlewares/md5')
const koaBody = require('koa-body');

const log4js = require('./util/log4j')
onerror(app)

app.keys = ['this is my secret set'];

app.use(session({
    key: 'koa:sess',
    /** cookie的名称，可以不管 */
    maxAge: 7200000,
    /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
}, app));

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 20000000 * 1024 * 1024
    }
}))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// 中间件  views(选择需要解析的html文件夹, {map: {html: 'ejs'}) 通过 ejs语法来解析这些html的页面
app.use(views(__dirname + '/views', {
    // extension: 'ejs'
    map: { html: 'ejs' }
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
        // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    log4js.resLogger(ctx, ms);
})

app.use(passport.initialize())
app.use(passport.session())

//跨域处理
app.use(cors({
    origin:function(ctx) {
        return '*'; //只允许http://localhost:8080这个域名的请求
    },
    credentials: true,
    maxAge: 300,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type','Authorization','Accept','origin','x-requested-with'],
    exposeHeaders: ['WWW.Authenticate','Server-Authorization']
}))

const path = require('path');
const static = require('koa-static');
app.use(static(
    path.join(__dirname, '/public'),{    //静态文件所在目录
        maxage: 30*24*60*60*1000        //指定静态资源在浏览器中的缓存时间
    }
));




const resume = require('./routes/list.js'),
upload = require('./routes/upload.js')
;
const user = require('./routes/user.js');

app.use(user.routes(), user.allowedMethods());
app.use(resume.routes(), resume.allowedMethods());
app.use(upload.routes(),upload.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    log4js.errLogger(ctx, err)
    console.error('server error', err, ctx)
});

module.exports = app