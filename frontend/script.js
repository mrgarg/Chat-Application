let socket =io();
socket.on('connected--',()=>{
     console.log("Socket formed on "+socket.id)   // socket refers to the pipeline
})

$(function(){

    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginbtn = $('#loginbtn')
    let loginbox = $('#loginbox')
    let logindiv = $('#login-div')
    let chatdiv = $('#chat-div')
    let header = $('#header')

    let user = ''
    
    sendbtn.click(function(){
        socket.emit('send_msg',{
            user:user,
            message:msgbox.val()
        })
    })

    loginbtn.click(function(){
        user = loginbox.val()
        chatdiv.show()   
        logindiv.hide()
        header.hide()
        socket.emit('login',{
            user:user
        })
    })

    socket.on('recv_msg',function(data){
        msglist.append($('<li>' + data.user+": "+ data.message + '</li>'))
    })




})