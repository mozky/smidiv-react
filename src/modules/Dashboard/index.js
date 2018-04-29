import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute, PropsRoute } from '../Helpers'
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

class Dashboard extends Component {
    render() {
        return (
            <div id="Dashboard">
                <Header username={this.props.user.username} handleLogout={this.props.handleLogout}/>
                <Navbar currentTab={this.props.location.pathname}/>
                <main id="Content" className="area">
                    <Route exact path={this.props.match.url} component={Home}/>
                    <Route exact path={`${this.props.match.url}/404`} render={() => <div>TODO: 404 page</div>}/>
                    <Route exact path={`${this.props.match.url}/about`} component={About}/>
                    <Route exact path={`${this.props.match.url}/alarma`} component={Alarmas}/>
                    <Route exact path={`${this.props.match.url}/estatus`} component={Estatus} />
                    <Route exact path={`${this.props.match.url}/ubicaciones`} component={Ubicaciones} />
                    <Route exact path={`${this.props.match.url}/configuracion`} component={Configuracion}/>
                    <Route exact path={`${this.props.match.url}/historial`} component={Historial}/>
                </main>
                <Footer />
            </div>
        )
    }
}

export default Dashboard
