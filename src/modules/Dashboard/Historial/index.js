import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import LocationIcon from 'react-icons/lib/md/location-on'

import './Historial.css'

export default class Historial extends Component {
    render() {
        const data = [{
            id: 1,
            fecha: '06/11/2017',
            hora: '13:30',
            accion: 'Encendido',
            ubicacion: '1'
        }, {
            id: 2,
            fecha: '07/11/2017',
            hora: '18:45',
            accion: 'Alarma activa',
            ubicacion: '2'
        }, {
            id: 3,
            fecha: '04/10/2017',
            hora: '12:01',
            accion: 'Reporte de ubicación',
            ubicacion: '2'
        }, {
            id: 4,
            fecha: '01/10/2017',
            hora: '04:20',
            accion: 'Encendido',
            ubicacion: '2'
        }, {
            id: 5,
            fecha: '28/09/2017',
            hora: '10:19',
            accion: 'Alarma desactivada',
            ubicacion: '2'
        }]

        const columnas = [{
            Header: 'Id',
            accessor: 'id',
            width: 150
        }, {
            Header: 'Fecha',
            accessor: 'fecha'
        }, {
            Header: 'Hora',
            accessor: 'hora'
        }, {
            Header: 'Acción',
            accessor: 'accion'
        }, {
            Header: 'Ubicación',
            accessor: 'ubicacion',
            Cell: () => <LocationIcon className="clickable rojo icon" />
        }]

        return (
            <div id="Historial" className="DashboardPage">
                <div className="titulo">Historial del automóvil</div>
                <div className="tabla">
                    <ReactTable showPagination={false} defaultPageSize={5} data={data} columns={columnas} />
                </div>
            </div>
        )
    }
}