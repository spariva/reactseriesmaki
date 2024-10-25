import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import DetalleSerie from './DetalleSerie';
import DetallePersonajes from './DetallePersonajes';
import CreatePersonaje from './CreatePersonaje';
import UpdatePersonaje from './UpdatePersonaje';

export default class Router extends Component {
    render() {
        function ElementDetalleSerie() {
            let { id } = useParams();
            return(<DetalleSerie id={id}/>)
        }

        function ElementDetallePersonajes() {
            let { id } = useParams();
            return(<DetallePersonajes id={id}/>)
        }
    
        return (
            <div>
                <BrowserRouter>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/serie/:id' element={<ElementDetalleSerie />} />
                        <Route path='/personajes/:id' element={<ElementDetallePersonajes/>} />
                        <Route path="/create" element={<CreatePersonaje />} />
                        <Route path='/update' element={<UpdatePersonaje />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
