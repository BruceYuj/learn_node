

//和koa 1.x不同的是，koa2中导入的是一个class，所以用大写Koa表示
const Koa = require('koa');
//引入bodyparser解析request.body
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

// 创建一个Koa对象表示web app本身
const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

//对于所有请求，app都调用该异步方法来处理请求
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var 
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());
//add router middleware

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());

app.listen(4000);
console.log('app started at port 4000');


