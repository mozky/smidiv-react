import 'whatwg-fetch'
import { ValidateToken, RemoveToken } from '../helpers'

const API_HOST = process.env.NODE_ENV === 'production' ? 'smidiv.javiersl.com' : 'localhost'
const API_PORT = process.env.API_PORT || '10010'
const API_URL = `http://${API_HOST}:${API_PORT}/`

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
          return res.text()
        } else if (res.status === 403) {
          console.log('token expired or user revoked access')
          RemoveToken()
          reject(res.status)
        } else {
          reject(res.status)
        }
      }).then(body => {
        let user = JSON.parse(body)
        resolve(user)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function userPatch(request) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      password: request.contraseña,
      email: request.correoElectronico,
      profile: {
        firstName: request.nombre,
        lastName: request.apellidos,
        birthday: request.fechaDeNacimiento
      }
    }

    fetch(API_URL + 'user/' + request.username, {
      method: 'PATCH',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('PATCH USER FAV', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(true)
      })
  })
}

function vehiclePost(request) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'username': request.username,
      'marca': request.marca,
      'modelo': request.modelo,
      'placas': request.placas,
      'smidivID': request.smidivID
    }

    fetch(API_URL + 'vehicle', {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST VEHICLE', res.ok, res.status, res.statusText)
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
        resolve(res.response)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function vehiculoPatch(request) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'idVehiculo': request.vehiculo._id,
      'username': request.username,
    }

    if (request.marca) {
      args.marca = request.marca.nombre
    }

    if (request.modelo) {
      args.modelo = request.modelo
    }

    if (request.smidivID) {
      args.smidivID = request.smidivID
    }

    if (request.placas) {
      args.placas = request.placas
    }

    fetch(API_URL + 'vehicle/', {
      method: 'PATCH',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('PATCH VEHICULO', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(true)
      })
  })
}

function ubicacionFavPost(request) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'idUsuario': request.username,
      'nombre': request.nombre,
      'ubicacion': {
        'lat': request.center.lat,
        'lng': request.center.lng
      }
    }

    fetch(API_URL + 'ubicacionFav', {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST UBICACION FAV', res.ok, res.status, res.statusText)
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
        resolve(res.response)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function ubicacionFavGet(username) {
  return new Promise(function(resolve, reject) {
    fetch(API_URL + 'ubicacionFav/' + username, {
      method: 'GET',
      headers: getValidToken()
    })
      .then(res => {
        console.log('GET UBICACION FAV', res.ok, res.status, res.statusText)
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
        resolve(res.response)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function ubicacionFavDelete(ubicacionId) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'idUbicacion': ubicacionId,
    }

    fetch(API_URL + 'ubicacionFav/', {
      method: 'DELETE',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('DELETE UBICACION FAV', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(true)
      })
  })
}

function ubicacionFavPatch(request) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'idUbicacion': request.ubicacionId,
      'nombre': request.nombre,
      'ubicacion': request.center
    }

    fetch(API_URL + 'ubicacionFav/', {
      method: 'PATCH',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('PATCH UBICACION FAV', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(true)
      })
  })
}

function alarmaPost(request) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'nombre': request.nombre,
      'username': request.username,
      'vehiculo': request.vehiculo
    }

    if (request.ubicacionFav) {
      args.ubicacionFav = request.ubicacionFav
    }

    if (request.rangoHorario) {
      args.rangoHorario = request.rangoHorario
    }

    if (request.rangoDistancia) {
      args.rangoDistancia = request.rangoDistancia
    }

    fetch(API_URL + 'alarma', {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
    .then(res => {
      console.log('POST UBICACION FAV', res.ok, res.status, res.statusText)
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
      resolve(res.response)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

function alarmaGet(username) {
  return new Promise(function(resolve, reject) {
    const headers = getValidToken()
    fetch(API_URL + 'alarma/' + username, {
      headers
    })
    .then(res => {
      console.log('GET ALARMAS', res.ok, res.status, res.statusText)
      if (res.status === 200) {
        return res.text()
      } else if (res.status === 403) {

        reject(res.status)
      } else {
        reject(res.status)
      }
    }).then(body => {
      const response = JSON.parse(body).response
      resolve(response)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

function alarmaDelete(alarmaId) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'idAlarma': alarmaId,
    }

    fetch(API_URL + 'alarma/', {
      method: 'DELETE',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('DELETE ALARMA', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(true)
      })
  })
}

function alarmaPatch(request) {
  return new Promise(function(resolve, reject) {
    const token = getValidToken()
    const args = {
      'idAlarma': request.idAlarma,
      'nombre': request.nombre,
      'estado': request.estado
    }

    fetch(API_URL + 'alarma/', {
      method: 'PATCH',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, token),
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('PATCH ALARMA FAV', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(true)
      })
  })
}

export default  {
  login,
  health,
  userGet,
  register,
  userPatch,
  alarmaGet,
  alarmaPost,
  alarmaPatch,
  vehiclePost,
  alarmaDelete,
  vehiculoPatch,
  ubicacionFavGet,
  ubicacionFavPost,
  ubicacionFavPatch,
  ubicacionFavDelete,
}
