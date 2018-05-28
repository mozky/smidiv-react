import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { PropsRoute } from '../Helpers'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import About from './About'
import Ubicaciones from './Ubicaciones'
import Configuracion from './Configuracion'
import Historial from './Historial'
import Alarmas from './Alarmas'
import Estatus from './Estatus'
import Home from './Home'
import './Dashboard.css'

import { GoogleApiWrapper } from 'google-maps-react' 

class Dashboard extends Component {
    render() {
        const { user, handleLogout, location, refreshData, google, match, ubicaciones, alarmas } = this.props

        const bundle = {
            user,
            ubicaciones,
            refreshData,
            alarmas
        }

        return (
            <div id="Dashboard">
                <Header name={user.profile ? user.profile.firstName : ''} handleLogout={handleLogout}/>
                <Navbar currentTab={location.pathname}/>
                <main id="Content" className="area">
                    <Route exact path={match.url} component={Home}/>
                    <Route exact path={`${match.url}/404`} render={() => <div>TODO: 404 page</div>}/>
                    <Route exact path={`${match.url}/about`} component={About}/>
                    <Route exact path={`${match.url}/estatus`} component={Estatus}/>
                    <Route exact path={`${match.url}/historial`} component={Historial}/>
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
