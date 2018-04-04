import React, { Component } from 'react'
import CarIcon from 'react-icons/lib/md/directions-car'
import UserIcon from 'react-icons/lib/md/person'
import SettingsIcon from 'react-icons/lib/md/settings'
import AddIcon from 'react-icons/lib/md/add-circle'

import './Ubicaciones.css'

export default class Ubicaciones extends Component {
    render() {
        return (
            <div id="Ubicaciones">
                <div className="settings">
                    <CarIcon className="ubicaciones-icon-big gray" />
                    <div id="carSettings">
                        <AddIcon className="ubicaciones-icon-clickable green" />
                        <SettingsIcon className="ubicaciones-icon-clickable yellow" />
                    </div>
                </div>
                <div className="settings">
                    <UserIcon className="ubicaciones-icon-big gray" />
                    <SettingsIcon className="ubicaciones-icon-clickable yellow" />
                </div>
            </div>
        )
    }
}