import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';
import axios from 'axios';

export default class DetallePersonajes extends Component {
    //* Separo este component porque en el ejemplo aparece como una ruta diferenciada /personajes/idSerie por lo cual entiendo que hay que separarlo en vez de jugar directamente a mostrar y esconder en el component parent DetalleSerie.

    state = {
        personajes: [],
        personajesFiltrados: []
    }

    loadPersonajes = () => {
        let url = Global.apiSeries + "api/personajes/";
        console.log(url)

        axios.get(url).then(response => {
            let aux = response.data.filter(personaje => personaje.idSerie === parseInt(this.props.id));
            console.log(aux);
            this.setState({
                personajes: response.data,
                personajesFiltrados: aux
            })
        })
    }






    componentDidMount = () => {
        this.loadPersonajes();
    }

    componentDidUpdate = (oldProps) => {
        if (this.props !== oldProps) {
            this.loadPersonajes();
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid mt-3">
                    <h1>Personajes de 2</h1>
                    <hr className="border border-primary opacity-100"></hr>
                    <NavLink className="btn btn-danger w-100" to={"/serie/" + this.props.id}>Volver a serie</NavLink>
                    <table className="table mt-3">
                        <thead className="border-primary">
                            <tr><th>Personaje</th><th>Imagen</th></tr>
                        </thead>
                        <tbody>
                            {
                                this.state.personajesFiltrados.map((personaje, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{personaje.nombre}</td>
                                            <td><img className="img-fluid" alt="a" src={personaje.imagen} style={{ height: "150px", width: "150px" }} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
