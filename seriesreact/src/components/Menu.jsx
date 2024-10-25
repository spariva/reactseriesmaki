import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';
import axios from 'axios';

export default class Menu extends Component {

    state = {
        series: []
    }

    loadSeries = () => {
        let request = "api/series/";
        let url = Global.apiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                series: response.data
            })
            // console.log(response.data);
        })
    }



    componentDidMount = () => {
        this.loadSeries();
    }

    componentDidUpdate = (oldProps) => {
        if (this.props !== oldProps) {
            this.loadSeries();
        }
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary" aria-label="Third navbar example">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">Series 🐲</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample03">
                            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/create">Nuevo personaje</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/update">Modificar personaje</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Series</NavLink>
                                    <ul className="dropdown-menu">
                                        {
                                            this.state.series.map((serie, i) => {
                                                return (
                                                    <li key={i}><NavLink className="dropdown-item" to={"/serie/" + serie.idSerie}>{serie.nombre}</NavLink></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" to="/departamentos" target="_blank">Departamentos</NavLink>
                                </li> */}
                                {/* <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Departamentos</NavLink>
                                    <ul className="dropdown-menu">
                                        {
                                            this.state.departamentos.map((hospital, i) => {
                                                return (
                                                    <li key={i}>
                                                        <NavLink className="dropdown-item btn-success" to={"/doctores/" + hospital.idhospital}>{hospital.nombre}</NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
      </div>
    )
  }
}
