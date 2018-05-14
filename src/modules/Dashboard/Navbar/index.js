import React, { Component } from 'react'
import LocationIcon from 'react-icons/lib/md/location-on'
import CarIcon from 'react-icons/lib/md/directions-car'
import HistoryIcon from 'react-icons/lib/md/history'
import AlarmIcon from 'react-icons/lib/md/alarm'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Navbar.css'

export default class Navbar extends Component {
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
            const { icon } = tab[1]
            
            return (
                <Link to={tabUrl} key={tabUrl} className={(this.props.currentTab === tabUrl ? 'selected': 'clickable') + ' navitem'}>
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
