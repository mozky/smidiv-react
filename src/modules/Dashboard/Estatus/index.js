import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import './Estatus.css'

export default class Estatus extends Component {
    render() {
        // const data = [{
        //     id: 'P0627',
        //     fecha: "23/02/2017",
        //     hora: "17:23",
        //     descripcion: "Falla en circuito de bomba de combustible"
        // }, {
        //     id: 'P0168',
        //     fecha: "18/02/2017",
        //     hora: "12:23",
        //     descripcion: "Temperatura de combustible del motor muy alta"
        // }, {
        //     id: 'P0199',
        //     fecha: "23/02/2017",
        //     hora: "17:01",
        //     descripcion: "Sensor de temperatura del aceite intermitente"
        // }, {
        //     id: 'P0200',
        //     fecha: "02/02/2017",
        //     hora: "12:23",
        //     descripcion: "Error en sistema de inyección"
        // }, {
        //     id: 'P0298',
        //     fecha: "23/02/2017",
        //     hora: "17:01",
        //     descripcion: "Sobrecalentamiento del aceite del motor"
        // }]
        const data = []

        const columnas = [{
            Header: 'PID',
            accessor: 'id',
            width: 150
        }, {
            Header: 'Fecha',
            accessor: 'fecha',
            width: 150
        }, {
            Header: 'Hora',
            accessor: 'hora',
            width: 150
        }, {
            Header: 'Descripción',
            accessor: 'descripcion'
        }]

        return (
            <div id="Estatus" className="DashboardPage">
                <div className="titulo">Estatus del automóvil</div>
                <div className="tabla">
                    {data.length > 0 ? 
                        <ReactTable showPagination={false} defaultPageSize={5} data={data} columns={columnas} />
                    :
                        <div style={{height: '100%', margin: 'auto'}}>El automóvil no presenta códigos de error.</div>
                    }
                </div>
            </div>
        )
    }
}