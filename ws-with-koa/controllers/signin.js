
var index = 0;

module.exports = {
    'GET /signin': async (ctx, next) => {
        let names = 'ABCDEFGHJK';
        let name = names[index%10];
        ctx.render('signin.html', {
            name: `路人${name}`
        });
    },
    'POST /signin': async (ctx, next) => {
        index ++;
        let name = ctx.request.body.name || '路人A';
        let user = {
            id: index,
            name: name,
            image: index % 10
        };
        // 将user对象变成json字符串，转成2进制，然后用Base64编码化
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        ctx.cookies.set('name', value);
        ctx.response.redirect('/');
    },
    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
}