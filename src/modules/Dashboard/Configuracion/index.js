import React, { Component } from 'react'
import CarIcon from 'react-icons/lib/md/directions-car'
import UserIcon from 'react-icons/lib/md/person'
import SettingsIcon from 'react-icons/lib/md/settings'
import AddIcon from 'react-icons/lib/md/add-circle'

import './Configuracion.css'

export default class Configucarion extends Component {
    render() {
        return (
            <div id="Ubicaciones">

                <div className="settings">
                    <CarIcon className="ubicaciones-icon-big gris" />
                    <div id="carSettings">
                        <AddIcon className="ubicaciones-icon-clickable verde" />
                        <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                    </div>
                </div>
                <div className="settings">
                    <UserIcon className="ubicaciones-icon-big gris" />
                    <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                </div>
            </div>
        )
    }
}