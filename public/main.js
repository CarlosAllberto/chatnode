const socket = io()

let userList = []

const loginPage = document.querySelector('#login-page')
const chatPage = document.querySelector('#chat-page')
const loginInput = document.querySelector('#login-input')
const textInput = document.querySelector('#text-input')
chatPage.style.display = 'none'
var username = ''

loginInput.focus()

const renderUserList = () => {
	let ul = document.querySelector('.user-list')
	ul.innerHTML = ''
	userList.forEach(e => {
		ul.innerHTML += `<li>${e}</li>`
	})
}

const addMessage = (type, user, msg) => {
	let ul = document.querySelector('.messages')

	switch (type) {
		case 'status':
			ul.innerHTML += `
      <li>
        <p class="mt-2 mb-0">${msg}</p>
      </li>`
			break

		case 'msg':
			ul.innerHTML += `
      <li>
        <div class="bg-white py-2 px-2 rounded shadow-sm mb-4 ms-system message-content">
          <span>${user}</span>
          <p class="mt-2 mb-0">${msg}</p>
        </div>
      </li>`
			break

		case 'msgMe':
			ul.innerHTML += `
      <li class="me">
        <div class="bg-white py-2 px-2 rounded shadow-sm mb-4 ms-system message-content">
          <span>Eu</span>
          <p class="mt-2 mb-0">${msg}</p>
        </div>
      </li>`
			break
	}

	ul.scrollTop = ul.scrollHeight
}

loginInput.addEventListener('keyup', e => {
	if (e.keyCode === 13) {
		let name = loginInput.value.trim()
		if (name != '') {
			username = loginInput.value
			document.title = `${username} | Chat`
			socket.emit('join', username)
		}
	}
})

textInput.addEventListener('keyup', e => {
	if (e.keyCode === 13) {
		let message = textInput.value.trim()
		textInput.value = ''
		if (message != '') {
			socket.emit('message', message)
			addMessage('msgMe', username, message)
		}
	}
})

socket.on('user-ok', list => {
	loginPage.style.display = 'none'
	chatPage.style.display = 'inline'
	textInput.focus()

	addMessage('status', null, 'Conectado!')

	userList = list
	renderUserList()
})

socket.on('list-update', data => {
	if (data.joined) addMessage('status', null, `${data.joined} entrou no chat.`)

	if (data.left) addMessage('status', null, `${data.joined} saiu do chat.`)

	userList = data.list
	renderUserList()
})

socket.on('message-recv', data => addMessage('msg', data.username, data.message))

socket.on('disconnect', () => {
  addMessage('status', null, 'Você foi desconectado.')
  userList = []
  renderUserList()
  textInput.disabled = true
})

socket.on('reconnect_error', () => addMessage('status', null, 'Tentando reconectar...'))

socket.on('reconnect', () => {
  textInput.disabled = false
  addMessage('status', null, 'Você foi reconectado.')
  if (username != '') {
    socket.emit('join', username)
  }
})
