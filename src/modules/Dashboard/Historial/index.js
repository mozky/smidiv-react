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
            Header: 'Fecha',
            accessor: 'fecha',
            Cell: (accessor) => {
                const fecha = new Date(accessor.original.fechaCreacion)
                return fecha.toLocaleDateString("es-MX")
            }
        }, {
            Header: 'Hora',
            accessor: 'hora',
            Cell: (accessor) => {
                const fecha = new Date(accessor.original.fechaCreacion)
                return timeNow(fecha)
            }
        }, {
            Header: 'Acción',
            accessor: 'accion',
            Cell: (accessor) => {
                return `${accessor.original.tipo.charAt(0).toUpperCase()}${accessor.original.tipo.slice(1)} ${accessor.original.valor}`
            }
        }, {
            Header: 'Ubicación',
            accessor: 'ubicacion',
            Cell: () => <LocationIcon className="clickable rojo icon" />
        }]

        return (
            <div id="Historial" className="DashboardPage">
                <div className="titulo">Historial de alertas</div>
                <div className="tabla">
                <ReactTable
                        showPagination={true}
                        defaultPageSize={10}
                        data={this.props.bundle.alertas}
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

const timeNow = (i) => {
    const d = new Date(i)
    const h = (d.getHours()<10?'0':'') + d.getHours()
    const m = (d.getMinutes()<10?'0':'') + d.getMinutes()
    return h + ':' + m;
}