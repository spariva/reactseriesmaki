import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Global from '../Global';
import axios from 'axios';

export default class CreatePersonaje extends Component {
  // No funciona la url de la imagen, da error 500 si meto barras, si pongo un string sin más, va bien no sé por qué
  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  cajaSerie = React.createRef();

  state = {
    series: [],
    status: false,
    idSerie: 0
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

  crearPersonaje = (e) => {
    e.preventDefault();
    let idSerie = parseInt(this.cajaSerie.current.value);
    let url = Global.apiSeries + "api/personajes/";
    //let url = "https://apiseriespersonajes2024.azurewebsites.net/api/personajes/"
    //console.log(url)

    let personaje = {
      idPersonaje: 0,
      nombre: this.cajaNombre.current.value,
      imagen: this.cajaImagen.current.value,
      idSerie: idSerie
    }

    console.log(personaje);

    axios.post(url, personaje, {
    }).then(response => {
      this.setState({
        status: true,
        idSerie: idSerie
      })
      console.log(response.data);
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
    // if (this.state.status) {
    //   return (<Navigate to="/" />)
    // }
    if (this.state.status) {
      return (<Navigate to={"/personajes/" + this.cajaSerie.current.value} />)
    }
    return (
      <div>
        <div className="container-fluid mt-3"><h1>Crear personaje</h1><hr className="border border-primary opacity-100" />
          <form onSubmit={this.crearPersonaje}>
            <div className="mt-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" type="text" ref={this.cajaNombre} />
            </div>
            <div className="mt-3">
              <label className="form-label">Imagen</label>
              <input className="form-control" type="text" ref={this.cajaImagen} />
            </div>
            <div className="mt-3">
              <label className="form-label">Serie</label>
              <select className="form-select" ref={this.cajaSerie}>

                {
                  this.state.series.map((serie, i) => {
                    return (
                      <option key={i} value={serie.idSerie}>{serie.nombre}</option>
                    )
                  })
                }
              </select>
            </div>
            <button className="btn btn-success mt-3 w-100">Crear personaje</button>
          </form>
        </div>
      </div>
    )
  }
}
