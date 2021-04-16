const router = require('koa-router')(),
    Sql = require('../service/operations_sql');
const fs = require('fs');
router.prefix('/pc')
router.post('/upload', (ctx) => {
    var status;
    let o=ctx.request.body
    var path=`./public/images/${new Date().getTime()}.png`
    var imgBuffer=new Buffer(o.content,'base64');
    fs.writeFileSync(path, imgBuffer, (err)=> {
       if (err) 
       {
        status=0
        return;
       }
      })
      ctx.body = {
        path:path,
        p:__dirname
    }
})


router.post('/upload/file',async (ctx)=>{
    let file =  ctx.request.files.file;
    let params = ctx.request.body,filePath = '',path = '';
    console.log(params)
    if(params.type==0){
        //图片上传
        filePath = './public/coverImg/'+file.name;
        path = '/coverImg/'+file.name;
    }
    else if(params.type==3){
        filePath = './public/css/'+file.name;
        path = '/css/'+file.name;
    }
    else{
        //简历
        filePath = './public/files/'+file.name;
        path = '/files/'+file.name;
    }
    let reader = fs.createReadStream(file.path);
    const upStream = await fs.createWriteStream(filePath);
    await reader.pipe(upStream);
    ctx.body = path;
})
module.exports = router;