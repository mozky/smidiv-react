import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import LocationIcon from 'react-icons/lib/md/location-on'

import VerAlerta from './VerAlerta'

import './Historial.css'

export default class Historial extends Component {
    constructor(props) {
        super(props)
        this.verAlertaRef = React.createRef()
        this.state = {
            alertaActiva: {
                lat: 0,
                lng: 0
            }
        }
    }

    setAlertaActiva = (ubicacionAlerta, callback) => {
        this.setState({
            alertaActiva: ubicacionAlerta
        }, callback)
    }

    toggleVerAlertaModal = (ubicacionAlerta) => {
        this.setAlertaActiva(ubicacionAlerta, this.verAlertaRef.current.click())
    }

    render() {
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
            Cell: (accessor) => <LocationIcon className="clickable rojo icon" onClick={() => this.toggleVerAlertaModal(accessor.original.ubicacionId.ubicacion)} />
        }]

        return (
            <div id="Historial" className="DashboardPage">
                <VerAlerta center={this.state.alertaActiva} google={this.props.google}>
                    <span ref={this.verAlertaRef}></span>
                </VerAlerta>
                <div className="titulo">Historial de alertas</div>
                <div className="tabla">
                <ReactTable
                        showPagination={true}
                        defaultPageSize={5}
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