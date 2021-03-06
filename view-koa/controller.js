
    const fs = require('fs');


function addControllers(router, dir) {
    //使用同步方法列出目录下的所有文件，使用同步是因为只会开始时调用
    var files = fs.readdirSync(__dirname + dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}`);
        let mapping = require(__dirname + dir + '/' + f); 
        addMapping(router, mapping);
    }
    
}


function addMapping(router, mapping) {
    for (var url in mapping) {
        if(url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

module.exports = function (dir) {
    let 
        controllers_dir = dir || '/controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}
