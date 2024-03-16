import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './header.css';
import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () =>{
    return(
        <>
            <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm gradient-custom-5">
                <div class='container container-width'>
                    <div>
                        <a class="navbar-brand navbar-brand-font">Dziennik Biegacza</a>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <button className='btn btn-menu'><Link to="/">Strona Główna</Link></button>
                        <button className='btn btn-menu'><Link to="/AddEvent">Dodaj wydarzenie</Link></button>
                        <button className='btn btn-menu'><Link to="/ModifyCategories">Edytuj kategorie</Link></button>
                        <button className='btn btn-menu'><Link to="/About">O Stronie</Link></button>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default (Header);