

var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'welcome'
    });
};

var fn_signin = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${email}, password: ${password}`);
    if (email === '444048170@qq.com' && password ==='12345') {
        // 登录成功
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {
        // 登录失败
        ctx.render('signin-failed.html', {
            title: 'Sign In failed'
        });

    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};