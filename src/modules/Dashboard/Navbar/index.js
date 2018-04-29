import React, { Component } from 'react'
import LocationIcon from 'react-icons/lib/md/location-on'
import CarIcon from 'react-icons/lib/md/directions-car'
import HistoryIcon from 'react-icons/lib/md/history'
import ModifyIcon from 'react-icons/lib/md/settings'
import AlarmIcon from 'react-icons/lib/md/alarm'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Navbar.css'

class Navbar extends Component {
    render() {
        const tabs = {
            '/app/alarma': {
                label: 'Alarma',
                icon: <AlarmIcon className="icon navsubitem" />
            },
            '/app/estatus': {
                label: 'Estatus del Automóvil',
                icon: <CarIcon className="icon navsubitem" />
            },
            '/app/ubicaciones': {
                label: 'Ubicaciones',
                icon: <LocationIcon className="icon navsubitem" />
            },
            '/app/historial': {
                label:'Historial',
                icon: <HistoryIcon className="icon navsubitem" />
            },
        }

        const buttons = Object.entries(tabs).map((tab, index) => {
            const tabUrl = tab[0]
            const { label, icon } = tab[1]
            
            return (
                <Link to={tab[0]} key={tab[0]} className={(this.props.currentTab === tab[0] ? 'selected': 'clickable') + ' navitem'}>
                    {icon}
                </Link>
            )
        }
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