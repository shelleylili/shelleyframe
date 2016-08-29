/**
 * Created by Administrator on 16-8-23.
 */
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.on('connection',function(socket){
    socket.on('addUser',function(data){ //有新用户进入聊天室
        socket.broadcast.emit("message","adduser control");
    });

    socket.on('addMessage',function(data){ //有用户发送新消息
    });

    socket.on('disconnect', function () {
            //有用户退出聊天室
    });
    socket.on("message",function(data){
        console.log(data);
    });
});

    http.listen(3002, function () {
        console.log('listening on *:3002');
    });