import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react' 
import { Route } from 'react-router-dom'
import { PropsRoute } from '../Helpers'

import Home from './Home'
import About from './About'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import Alarmas from './Alarmas'
import Estatus from './Estatus'
import Historial from './Historial'
import Ubicaciones from './Ubicaciones'
import Configuracion from './Configuracion'

import './Dashboard.css'


class Dashboard extends Component {
    render() {
        const { user, handleLogout, location, refreshData, google, match, ubicaciones, alarmas, alertas } = this.props

        const bundle = {
            user,
            ubicaciones,
            refreshData,
            alarmas,
            alertas
        }

        return (
            <div id="Dashboard">
                <Header name={user.profile ? user.profile.firstName : ''} handleLogout={handleLogout}/>
                <Navbar currentTab={location.pathname}/>
                <main id="Content" className="area">
                    <Route exact path={match.url} component={Home}/>
                    <Route exact path={`${match.url}/404`} render={() => <div>TODO: 404 page</div>}/>
                    <Route exact path={`${match.url}/about`} component={About}/>
                    <PropsRoute exact path={`${match.url}/estatus`} bundle={bundle} component={Estatus}/>
                    <PropsRoute exact path={`${match.url}/historial`} google={google} bundle={bundle} component={Historial}/>
                    <PropsRoute exact path={`${match.url}/alarma`} bundle={bundle} component={Alarmas}/>
                    <PropsRoute exact path={`${match.url}/configuracion`} bundle={bundle} component={Configuracion}/>
                    <PropsRoute exact path={`${match.url}/ubicaciones`} google={google} bundle={bundle} component={Ubicaciones}/>
                </main>
                <Footer />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBeOO21K3DTZmcYhEi3QwCfU3stWpADzM'
})(Dashboard)
