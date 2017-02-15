
//和koa 1.x不同的是，koa2中导入的是一个class，所以用大写Koa表示
const Koa = require('koa');

// 创建一个Koa对象表示web app本身
const app = new Koa();

//对于所有请求，app都调用该异步方法来处理请求

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`);
});

app.use(async (ctx, next) => {
    // console.log('11');
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>hello, koa2</h1>';
});

app.listen(3000);
console.log('app started at port 3000');


