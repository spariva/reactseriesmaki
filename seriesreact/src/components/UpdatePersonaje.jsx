import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Global from '../Global';
import axios from 'axios';

export default class UpdatePersonaje extends Component {
  cajaSerie = React.createRef();
  cajaPersonaje = React.createRef();

  state = {
    personajes: [],
    personajeSeleccionado: null,
    serieSeleccionada: null,
    series: [],
    status: false,
    idSerie: 0
  }

  loadPersonajes = () => {
    let url = Global.apiSeries + "api/personajes/";
    console.log(url)

    axios.get(url).then(response => {
      this.setState({
        personajes: response.data,
      })
    })
  }

  loadSeries = () => {
    let request = "api/series/";
    let url = Global.apiSeries + request;

    axios.get(url).then(response => {
      this.setState({
        series: response.data
      })
    })
  }

  selectSerie = () => {
    let serie = this.state.series.filter(serie => serie.idSerie === parseInt(this.cajaSerie.current.value));

    this.setState({
      serieSeleccionada: serie[0]
    })  
    this.loadSeries();
  }

  selectPersonaje = () => {
    let personajeFiltrado = this.state.personajes.filter(personaje => personaje.idPersonaje === parseInt(this.cajaPersonaje.current.value));
    this.setState({
      personajeSeleccionado: personajeFiltrado[0]
    })
  }

  updatePersonaje = (e) => {
    e.preventDefault();

    let idPersonaje = parseInt(this.cajaPersonaje.current.value);
    let idSerie = parseInt(this.cajaSerie.current.value);
    let url = Global.apiSeries + "api/personajes/" + idPersonaje + "/" + idSerie;

    axios.put(url).then(response => {
      this.setState({
        status: true,
        idSerie: idSerie
      })
      console.log(response.data);
    })
  }

  componentDidMount = () => {
    this.loadPersonajes();
    this.loadSeries();
  }

  componentDidUpdate = (oldProps) => {
    if (this.props !== oldProps) {
      this.loadPersonajes();
      this.loadSeries();
    }
  }

  render() {
    if (this.state.status) {
      return (<Navigate to={"/personajes/" + this.state.idSerie} />)
    }
    return (
      <div>UpdatePersonaje
        <div className="container-fluid mt-3">
          <h1>Modificar personaje</h1>
          <hr className="border border-primary opacity-100" />
          <form onSubmit={this.updatePersonaje}>
            <div className="mt-3"><label className="form-label">Serie</label>
              <select className="form-select" ref={this.cajaSerie} onChange={this.selectSerie}>
                {
                  this.state.series.map((serie, i) => {
                    return (
                      <option key={i} value={serie.idSerie}>{serie.nombre}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="mt-3">
              <label className="form-label">Personaje</label>
              <select className="form-select" ref={this.cajaPersonaje} onChange={this.selectPersonaje}>
                {
                  this.state.personajes.map((personaje, i) => {
                    return (
                      <option key={i} value={personaje.idPersonaje}>{personaje.nombre}</option>
                    )
                  })
                }
              </select>
            </div>
            <button className="btn btn-success w-100 mt-3">Modificar personaje</button>
          </form>
          <div className="row mt-3">
            {
              this.state.serieSeleccionada &&
              (<div className="col-6">
                <h3>{this.state.serieSeleccionada.nombre}</h3>
                <img src={this.state.serieSeleccionada.imagen} alt={this.state.serieSeleccionada.nombre} />
              </div>)
            }
            {
              this.state.personajeSeleccionado &&
              (<div className="col-6">
                <h3>{this.state.personajeSeleccionado.nombre}</h3>
                <img src={this.state.personajeSeleccionado.imagen} alt={this.state.personajeSeleccionado.nombre} />
              </div>)
            }
            </div></div>
      </div>
    )
  }
}
