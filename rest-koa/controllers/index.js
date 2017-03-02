

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html');
        await next();
    }
};