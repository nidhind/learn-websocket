"use strict";
const express = require('express');
const app = express();
var ws = require('express-ws')(app);

const users = {};


app.use(express.static(__dirname));
app.ws('/', function (ws, req) {
    // On connection, save users to in memory
    ws.on('message', function (msg) {
        msg = JSON.parse(msg);
        switch (msg.action) {
            case 'join':
                users[msg.name] = this;
                break;
            case 'connect':
                connectWithUser(msg, ws);
                break;
            case 'send':
                sendMessage(msg);
                break;
        }
    });
});

app.listen(3000, function () {
    console.log('Serving at 3000');
});

function connectWithUser(msg, me) {
    if (users[msg.user]) {
        me.send(JSON.stringify({
            action: 'connect',
            status: true
        }));
    } else {
        me.send(JSON.stringify({
            action: 'connect',
            status: false
        }));
    }
}

function sendMessage(msg) {
    const msgObj = {
        action: 'message',
        message: msg.message,
        user: msg.me
    };
    users[msg.user].send(JSON.stringify(msgObj));
}