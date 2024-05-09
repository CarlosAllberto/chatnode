const socket = io()

let userList = []

const loginPage = document.querySelector('#login-page')
const chatPage = document.querySelector('#chat-page')
const loginInput = document.querySelector('#login-input')
chatPage.style.display = 'none'
var userName = ''

loginInput.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    let name = loginInput.value.trim()
    if (name != '') {
      userName = loginInput.value 
      document.title = userName
      loginPage.style.display = 'none'
      chatPage.style.display = 'inline'
    }
  }
})