


//和koa 1.x不同的是，koa2中导入的是一个class，所以用大写Koa表示
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');
const staticFiles = require('./static-files');
const templating = require('./templating');
const rest = require('./rest').restify;
// 创建一个Koa对象表示web app本身
const app = new Koa();


//对于所有请求，app都调用该异步方法来处理请求
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(staticFiles('/static/', __dirname + '/static'));

app.use(bodyParser());
app.use(templating('views', {
    noCache: true,
    watch: true
}));
app.use(rest());
app.use(controller());

app.listen(4000);
console.log('app started at port 4000');


