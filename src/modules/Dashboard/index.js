import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute, PropsRoute } from '../Helpers'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import About from './About'
import './Dashboard.css'

class Dashboard extends Component {
    render() {
        return (
            <div id="Dashboard">
                <Header username={this.props.user.username} handleLogout={this.props.handleLogout}/>
                <Navbar currentTab={this.props.location.pathname}/>
                <main id="Content" className="centered">
                    <Route exact path={this.props.match.url} render={() => <div>SMIDIV!</div>}/>
                    <Route exact path={`${this.props.match.url}/404`} render={() => <div>TODO: 404 page</div>} />
                    <Route exact path={`${this.props.match.url}/about`} component={About}/>
                </main>
                <Footer />
            </div>
        )
    }
}

export default Dashboard
