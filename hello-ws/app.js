

const WebSocket = require('ws');

//引用Server类
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: 8000
});

wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    });
});
console.log('ws is opening at port 8000:');
/*
const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: 3000
});

wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        setTimeout(() => {
            ws.send(`What's your name?`, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        }, 1000);
    })
});

console.log('ws server started at port 3000...');
*/