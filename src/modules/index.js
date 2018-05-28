import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Landing from './Landing'
import LoadingScreen from './LoadingScreen'
import Dashboard from './Dashboard'
import Authenticate from './Authentication'
import { PropsRoute, PrivateRoute } from './Helpers'
import { ValidateToken } from './../helpers'
import Api from './../api'

class App extends Component {
  constructor(props) {
    super(props)
    this.loadApp = this.loadApp.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.forceRefresh = this.forceRefresh.bind(this)

    let localToken
    let tokenData
    if (window.localStorage) {
      localToken = window.localStorage.getItem('API_TOKEN')
    }

    localToken ? (
      tokenData = ValidateToken(localToken)
    ) : (
      tokenData = false
    )

    this.state = {
      isLoggedIn: (tokenData ? true : false),
      token: (tokenData ? tokenData : 'null'),
      user: 'null',
      ubicaciones: []
    }

  }

  getUserData() {
    if ( this.state.token !== 'null' && this.state.token.username ) {
      return Promise.all([
        Api.userGet(this.state.token.username)
        .then((response) => {
          this.setState({
            user: response.user
          })
        }).catch((err) => {
          console.log(err)
        }),
        Api.ubicacionFavGet(this.state.token.username)
        .then((response) => {
          this.setState({
            ubicaciones: response.ubicaciones
          })
        })
        .catch((err) => {
          console.log(err)
        }),
        Api.alarmaGet(this.state.token.username)
        .then((response) => {
          this.setState({
            alarmas: response.alarmas
          })
        })
        .catch((err) => {
          console.log(err)
        })
      ])
    }
  }

  loadApp(token) {
    console.log('Loading app...')
    this.setState({
      isLoggedIn: true,
      token
    })
    this.getUserData()
  }

  handleLogout() {
    window.localStorage.removeItem('API_TOKEN')
    this.setState({
      isLoggedIn: false,
      token: 'null',
      user: 'null',
      alarmas: 'null',
      ubicaciones: 'null'
    })
  }

  componentDidMount() {
    this.getUserData()
  }

  // I dont like this, but for now it is a way to refresh all data
  forceRefresh() {
    this.getUserData()
  }

  render() {

    if (this.state.token && this.state.isLoggedIn && this.state.user === 'null') {
      return (
        <LoadingScreen />
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />

            <PropsRoute path="/auth" component={Authenticate}
              loadApp={this.loadApp} />

            <PrivateRoute path="/app" component={Dashboard}
              refreshData={this.forceRefresh}
              user={this.state.user}
              ubicaciones={this.state.ubicaciones}
              alarmas={this.state.alarmas}
              admin={this.state.token.admin}
              isLoggedIn={this.state.isLoggedIn}
              handleLogout={this.handleLogout}
              redirectTo="/auth" />
          </Switch>
        </Router>
      )
    }

  }

}

export default App
