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

socket.on('user-ok', list => {
  loginPage.style.display = 'none'
  chatPage.style.display = 'inline'
  textInput.focus()
  userList = list
  renderUserList()
})

socket.on('list-update', data => {
  userList = data.list
  renderUserList()
})