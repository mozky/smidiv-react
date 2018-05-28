import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DeleteIcon from 'react-icons/lib/md/delete'
import AddIcon from 'react-icons/lib/md/add-circle'
import ModifyIcon from 'react-icons/lib/md/settings'
import AlarmOffIcon from 'react-icons/lib/md/alarm-off'

import AddAlarma from './AddAlarma'
import './Alarmas.css'

import Api from '../../../api'

export default class Alarmas extends Component {
    handleNewAlarma = (values) => {
        const nuevaAlarma = {
            nombre: values.nombre,
            ubicacionFav: values.ubicacionFav,
            username: this.props.bundle.user.username,
            vehiculo: this.props.bundle.user.vehiculo
        }

        console.log(nuevaAlarma)

        return new Promise((resolve, reject) => {
            Api.alarmaPost(nuevaAlarma)
            .then(response => {
                resolve(response)
                this.props.bundle.refreshData()
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })
    }

    deleteAlarma = (ubicacionId) => {
        Api.alarmaDelete(ubicacionId)
        .then(response => {
            this.props.bundle.refreshData()
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        console.log(this.props.bundle.alarmas)

        const columnas = [{
            Header: 'Alarma',
            accessor: 'nombre',
            width: 250
        }, {
            Header: 'Ubicacion / Tiempo',
            accessor: 'ubicacionfav.nombre',
            width: 250
        }, {
            Header: 'Modificar',
            accessor: '_id',
            Cell: () => <ModifyIcon className="clickable amarillo icon" />
        }, {
            Header: 'Silenciar',
            accessor: '_id',
            Cell: () => <AlarmOffIcon className="clickable azul icon" />
        }, {
            Header: 'Eliminar',
            accessor: '_id',
            Cell: (accessor) => <DeleteIcon className="clickable rojo icon" onClick={() => this.deleteAlarma(accessor.value)} />
        }]

        return (
            <div id="Alarmas" className="DashboardPage">
                <div className="title-container">
                    <div className="titulo">Gestión de alarmas</div>
                    <AddAlarma ubicaciones={this.props.bundle.ubicaciones} onSummit={this.handleNewAlarma}>
                        <AddIcon className="titulo-icon clickable verde icon"/>
                    </AddAlarma>
                </div>
                <div className="tabla">
                    <ReactTable
                        showPagination={true}
                        defaultPageSize={10}
                        data={this.props.bundle.alarmas}
                        columns={columnas}
                        previousText={'Anterior'}
                        nextText={'Siguiente'}
                        loadingText={'Cargando...'}
                        noDataText={'Sin datos'}
                        pageText={'Página'}
                        ofText={'de'}
                        rowsText={'filas'}
                    />
                </div>
            </div>
        )
    }
}