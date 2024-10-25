import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';
import axios from 'axios';

export default class DetalleSerie extends Component {
    state = {
        serie: null
    }

    loadSerie = () => {
        let url = Global.apiSeries + "/api/series/" + this.props.id;
        // console.log(url)

        axios.get(url).then(response => {
            this.setState({
                serie: response.data
            })
            // console.log(response.data);
        })
    }



    componentDidMount = () => {
        this.loadSerie();
    }

    componentDidUpdate = (oldProps) => {
        if (this.props !== oldProps) {
            this.loadSerie();
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.serie &&
                    (
                        <div className="container-fluid mt-3">
                            <hr className='border border-primary opacity-100'></hr>
                            <div className='card'>
                                <img className='card-img-top' src={this.state.serie.imagen} alt={this.state.serie.nombre} />
                                <div className='card-body'>
                                    <h5 className='card-title'>{this.state.serie.nombre}</h5>
                                    <p className='card-text'>"IMBD": {this.state.serie.puntuacion}</p>
                                    <NavLink className='btn btn-primary w-100' to={"/personajes/" + this.state.serie.idSerie}>Personajes</NavLink>

                                    {/*!! navlink! */}
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        )
    }
}
