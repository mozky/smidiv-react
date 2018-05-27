import React, { Component } from 'react'
import CarIcon from 'react-icons/lib/md/directions-car'
import UserIcon from 'react-icons/lib/md/person'
import SettingsIcon from 'react-icons/lib/md/settings'
import AddIcon from 'react-icons/lib/md/add-circle'
import Api from '../../../api'

import EditUser from './EditUser'
import AddCar from './AddCar'
import EditCar from './EditCar'

import './Configuracion.css'

export default class Configuracion extends Component {
    handleAddNewCar = (values) => {
        return new Promise((resolve, reject) => {
            Api.vehiclePost(Object.assign(values, { username: this.props.user.username })).then((car) => {
                console.log('Nuevo vehiculo agregado', car)
                this.props.refreshData()
                resolve()
            }).catch((error) => {
                console.log('Error #handleAddNewCar', error)
                reject()
            })
        })
    }

    handleUserEdit = (values) => {
        return new Promise((resolve, reject) => {
            Api.userPatch(Object.assign(values, { username: this.props.user.username })).then((user) => {
                console.log('Usuario editado', user)
                this.props.refreshData()
                resolve()
            }).catch((error) => {
                console.log('Error #handleAddNewCar', error)
                reject()
            })
        })
    }

    handleCarEdit = (values) => {
     console.log('No ')
    }

    render() {
        return (
            <div style={{width: '100%', paddingTop: '3em'}}>
                <div className="title-container">
                    <div className="titulo">Configuración</div>
                </div>
                <div id = "Configuracion-menu">
                    <div className="settings">
                        <CarIcon className="ubicaciones-icon-big gris" />
                        <div id="carSettings">
                            <AddCar onSummit={this.handleAddNewCar}>
                                <AddIcon className="ubicaciones-icon-clickable verde" />
                            </AddCar>
                            <EditCar onSummit={this.handleCarEdit}>
                                <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                            </EditCar>
                        </div>
                    </div>
                    <div className="settings">
                        <UserIcon className="ubicaciones-icon-big gris" />
                        <EditUser onSummit={this.handleUserEdit} user={this.props.user}>
                            <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                        </EditUser>
                    </div>
                </div>
            </div>
        )
    }
}