import 'whatwg-fetch'
import { ValidateToken, RemoveToken } from '../helpers'

const API_HOST = process.env.API_HOST || 'localhost'
const API_URL = `http://${API_HOST}:10010/`

// CONTIENE LAS FUNCIONES QUE MAPEAN LOS DIFERENTES METODOS DE LA API
function getValidToken(token) {
  return {
    'X-API-KEY': window.localStorage.getItem('API_TOKEN')
  }
}

function health() {
  return new Promise(function (resolve, reject) {
    fetch(API_URL + 'health')
      .then(res => {
        if (res.status === 200) {
          resolve(res.text())
        } else {
          reject('unexpected response from server')
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function login(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'username': request.username,
      'password': request.password
    }

    fetch(API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST LOGIN', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        return res.text()
      })
      .then(body => {
        let res = JSON.parse(body)
        if (!res.success) {
          reject(res.message)
        }

        // We validate the token and store it on browser's localStorage
        let userInfo = ValidateToken(res.token)
        if (userInfo) {
          window.localStorage.setItem('API_TOKEN', res.token)
          resolve(userInfo)
        } else {
          reject('error')
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function register(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'username': request.username,
      'email': request.email,
      'password': request.password
    }

    fetch(API_URL + 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST REGISTER', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        return res.text()
      })
      .then(body => {
        let res = JSON.parse(body)
        if (!res.success) {
          reject(res.message)
        }

        // We validate the token and store it on browser's localStorage
        let userInfo = ValidateToken(res.token)
        if (userInfo) {
          window.localStorage.setItem('API_TOKEN', res.token)
          resolve(userInfo)
        } else {
          reject('error')
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function userGet(username) {
  return new Promise(function(resolve, reject) {
    let headers = getValidToken()
    fetch(API_URL + 'user/' + username, {
      headers
    })
      .then(res => {
        console.log('GET USER', res.ok, res.status, res.statusText)
        if (res.status === 200) {
          resolve(res.text())
        } else if (res.status === 403) {
          console.log('token expired or user revoked access')
          RemoveToken()
        } else {
          reject(res.status)
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export default  {
    health,
    login,
    register,
    userGet
}
