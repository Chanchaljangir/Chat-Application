var express= require('express');
var app= express();
var http= require('http');
var server= http.createServer(app);
// var io=require('socket.io')(3000);
var io=require('socket.io').listen(server);
const port=3000;
// app.listen(port,()=>{
//     console.log('server start at port '+port);
//     });
server.listen(3000,()=>{
    console.log('server start at port ');
})
io.on('connection',(socket)=>{
    console.log('Socket opened');
//get message for join group
    socket.on('new_joinee',(data)=>{
        console.log("user select gp is ", data);
        socket.join(data.group);
        //notify everybody
        // socket.broadcast.emit('new user join

        //notify to paticular group
        // socket.in(data.group).broadcast.emit('new user join',{
        //     joinmsg: data.name +' successfully join '+ data.group,
        //     user:data.name,
        //     date: new Date()
        // })
        socket.broadcast.to(data.group).emit('new user join',{
            joinmsg: data.name +' successfully join '+ data.group,
            user:data.name,
            date: new Date()
        })
    })

//leave the group
    socket.on('leave group',(data)=>{
        console.log("user leave group is ", data);
        socket.broadcast.to(data.group).emit('left group',{
            leavemsg: data.name +' left the group '+ data.group,
            user:data.name,
            date: new Date()
        })
        socket.leave(data.group);
    })

//send msg or start chat
socket.on('chatting',(data)=>{
    console.log('start messeging ',data);
    io.in(data.group).emit('newMessage',{
        msg:data.msg,
        user:data.user,
        date: new Date()
    })
    // socket.in(data.group).broadcast.emit('serverSide_Start Chat',{
    //     msg: data.msg,
    //     user:data.name,
    //     date: new Date()
    // })
})
})
