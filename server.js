const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http =  require('http')

const app=  express();
const server = http.createServer(app); // creates a http server object
const io = socketio(server);

let usersockets={}
app.use('/',express.static(path.join(__dirname,'frontend')))


io.on("connection",(socket)=>{   // socket is the pipeline // for each connection....there will be a copy of below code
    console.log("new socket formed from "+socket.id);
    socket.emit("connected--")

    socket.on('login',(data)=>{
        //username is in data.user
        usersockets[data.user] =socket.id
        console.log(usersockets)
    })

    socket.on("send_msg",(data)=>{
        //console.log("Received msg = ",data.message)
       // io.emit('recv_msg',data) // distributed to all clients
       // socket.broadcast.emit('recv_msg',data)  // only others get it
        if(data.message.startsWith('@')){
            // data.message ="@a: hello"
            let recipient = data.message.split(':')[0].substr(1)
            let recpSocket = usersockets[recipient]
            io.to(recpSocket).emit('recv_msg',data)
        }
        else{
            socket.broadcast.emit('recv_msg',data)
        }



    })
})


server.listen(1234,()=>console.log("server run on http://localhost:1234"))



