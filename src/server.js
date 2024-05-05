const app = require('./app')
const socketIo = require('socket.io')

app.set('port', 7777)
const server = app.listen(app.get('port'), () => console.log('Servidor iniciado'))
const io = socketIo(server)

io.on('connection', socket => console.log('usuário conectado'))