A simple and basic but incomplete websocket based chat server and web client. Just for fun project :P

1> `npm i`

2> `npm start`

3>  edit `WS_CONN_STRING` in `client.js` to match your `server` ip and port

4> goto `port: 3000` in any two browsers

5> Type any name to identify you and click `connect` in one browser

6> Type any other name to identify other user and click connect on other browser

7> Come back to first browser and type the 'other name' in `chat` field and click `chat`. You will see a popup regarding
 connection status

8> Do step `7` on the other browser with your name.

9> Type in the message and click send. You can see the message on other browser.

As this is not even a prototype there are lot of flaws, but real time communication is easy with websockets
This implementation is uising native websockets of browser. Implementation can be made easy by using socket.io library 
in both server and client.