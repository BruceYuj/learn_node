const WebSocket = require('ws');

let ws = new WebSocket('ws://localhost:8000/test');

ws.on('open', function() {
    console.log(`[Client] open()`);
    ws.send('hello!');
});

ws.on('message', function (message) {
    console.log(`[Client] Received: ${message}`);
});

