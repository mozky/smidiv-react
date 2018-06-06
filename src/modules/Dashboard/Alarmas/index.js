import React, { Component } from 'react'
import ReactTable from 'react-table'
import DeleteIcon from 'react-icons/lib/md/delete'
import AddIcon from 'react-icons/lib/md/add-circle'
import ModifyIcon from 'react-icons/lib/md/settings'
import AlarmOffIcon from 'react-icons/lib/md/alarm-off'
import AlarmIcon from 'react-icons/lib/md/access-alarm'

import AddAlarma from './AddAlarma'

import 'react-table/react-table.css'
import './Alarmas.css'

import Api from '../../../api'

export default class Alarmas extends Component {
    handleNewAlarma = (values) => {
        const nuevaAlarma = {
            nombre: values.nombre,
            username: this.props.bundle.user.username,
            vehiculo: this.props.bundle.user.vehiculo._id
        }
        
        if (values.ubicacionFav) {
            nuevaAlarma.ubicacionFav = values.ubicacionFav
        } else if (values.inicio && values.fin) {
            nuevaAlarma.rangoHorario = {
                inicio: values.inicio,
                fin: values.fin
            }
        }

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

    toggleAlarma = (idAlarma, estadoActual) => {
        const values = {
            idAlarma,
            estado: !estadoActual
        }

        Api.alarmaPatch(values)
        .then(response => {
            this.props.bundle.refreshData()
        })
        .catch(err => {
            console.log(err)
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
        const columnas = [{
            Header: 'Alarma',
            accessor: 'nombre',
            width: 250
        }, {
            Header: 'Ubicacion',
            accessor: 'ubicacionfav.nombre',
            width: 200,
        }, {
            Header: 'Inicio',
            accessor: 'rangoHorario.inicio',
            width: 150,
        }, {
            Header: 'Fin',
            accessor: 'rangoHorario.fin',
            width: 150,
        }, {
            Header: 'Estado',
            accessor: '_id',
            Cell: (accessor) => {
                if (accessor.original.estado) {
                    return <AlarmIcon className="clickable azul icon" onClick={() => this.toggleAlarma(accessor.value, true)} />
                } else {
                    return <AlarmOffIcon className="clickable azul icon" onClick={() => this.toggleAlarma(accessor.value, false)} />
                }
            }
        }, {
        //     Header: 'Modificar',
        //     accessor: '_id',
        //     Cell: () => <ModifyIcon className="clickable amarillo icon" />
        // }, {
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