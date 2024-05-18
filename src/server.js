const app = require('./app')
const socketIo = require('socket.io')

app.set('port', 7777)
const server = app.listen(app.get('port'), () => console.log('Servidor iniciado'))
const io = socketIo(server)

let connectedUsers = []

io.on('connection', socket => {
  console.log('usuário conectado')
  socket.on('join', username => {
    socket.username = username
    connectedUsers.push(username)
    console.log(connectedUsers)

    socket.emit('user-ok', connectedUsers)
    socket.broadcast.emit('list-update', {
      joined: username,
      list: connectedUsers
    })
  })

  socket.on('disconnect', () => {
    connectedUsers = connectedUsers.filter(e => e != socket.username)
    socket.broadcast.emit('list-update', {
      left: socket.username,
      list: connectedUsers
    })
  })
})