
//和koa 1.x不同的是，koa2中导入的是一个class，所以用大写Koa表示
const Koa = require('koa');

// 引入router
const router = require('koa-router')();

//引入bodyparser解析request.body
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身
const app = new Koa();

//对于所有请求，app都调用该异步方法来处理请求

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});



// add url-route
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello, ${name}</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa" /></p>
            <p>Password: <input name="password" value="password" /></p>
            <p><input type="submit" value="submit" /></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password ==='12345') {
        ctx.response.body = `<h1>welcome, ${name}</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed</h1>
        <p><a href='/'>Try again</a></p>`;

    }
});
app.use(bodyParser());
//add router middleware
app.use(router.routes());




app.listen(4000);
console.log('app started at port 4000');


