const WS_CONN_STRING = 'ws://localhost:3000/';
const conn = {};
let me = null;
let user = null;
(function () {
    // Init websocket connection
    conn.handle = new WebSocket(WS_CONN_STRING);
    conn.handle.onmessage = handleNewMessage;
})();

function connectToServer() {
    me = $('#me').val();
    const msg = {
        action: 'join',
        name: me
    };
    conn.handle.send(JSON.stringify(msg))
}

function connectToUser() {
    user = $('#user').val();
    const msg = {
        action: 'connect',
        user: user
    };
    conn.handle.send(JSON.stringify(msg))
}

function handleNewMessage(event) {
    const data = JSON.parse(event.data);
    switch (data.action) {
        case 'connect':
            if (data.status === false) {
                alert('Connection failed with user');
            } else {
                alert('Connected to user');
                showChatBox();
            }
            break;
        case 'message':
            const msgHistory = $('#comment').val() + '\n' + data.message;
            $("#comment").val(msgHistory);
            $("#comment").animate({
                scrollTop: $("#comment")[0].scrollHeight - $("#comment").height()
            }, 250, function () {
            })
    }
}

function showChatBox() {
    // Took me more than an hour fucking with Jquery, but just half a minute with plain js
    document.getElementById('chatbox').removeAttribute('class');
}

function sendMsgToUserer() {
    const msg = {
        action: 'send',
        user: user,
        me: me,
        message: $('#msg-to-send').val()
    };
    conn.handle.send(JSON.stringify(msg));
    const msgHistory = $('#comment').val() + '\n' + msg.message;
    $("#comment").val(msgHistory);
    $("#comment").animate({
        scrollTop: $("#comment")[0].scrollHeight - $("#comment").height()
    }, 250, function () {
    })
}