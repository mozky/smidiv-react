import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Navbar.css'

class Navbar extends Component {
    render() {
        const tabs = {
            '/app/alarma': 'Alarma',
            '/app/estatus': 'Estatus del Automóvil',
            '/app/ubicaciones': 'Ubicaciones',
            '/app/historial': 'Historial',
            '/app/configuracion': 'Configuración'
        }

        const buttons = Object.entries(tabs).map((tab, index) => 
            <Link to={tab[0]} key={tab[0]} className={(this.props.currentTab === tab[0] ? 'selected': '')}>{tab[1]}</Link>
        )

        return (
            <nav id="Navbar">
                {buttons}
            </nav>
        )
    }
}

Navbar.propTypes = {
    currentTab: PropTypes.string.isRequired
}

export default Navbar