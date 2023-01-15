import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import incedo from "../../assests/incedo.jpg";
import  {Link, NavLink } from 'react-router-dom';
import { Sidebar } from "../sidebar/Sidebar";
import { IconContext } from 'react-icons';
import "./Navbar.css";



function Navbar() {
    
    const [sidebar1, setSidebar] = useState(false);

    const showSidebar = () => setSidebar (!sidebar1);

    return(
        <>
        <IconContext.Provider value = {{color: '#fff'}} >
        <div className="navbar1">
            <Link to='#' className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
        

            <nav className={sidebar1 ? 'nav-menu active' : 'nav-menu'}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to ='#' className="menu-bars">
                        <AiIcons.AiOutlineClose />
                    </Link>
                </li>

                {Sidebar.map((item, index) =>{
                    return (
                        <li key={index} className={item.cName}>
                            <NavLink to ={item.path}>
                                {item.icon}
                               <span>{item.title}</span>
                            </NavLink>
                        </li>
                    );
                } )}
              </ul>
            </nav>
            

            <div className="navbar__right">
                <a href="#">
                    <img width = "140" src={incedo} alt="incedo"/>
                </a>
            </div> 
            </div>
            </IconContext.Provider>
            </>
        
    );
};
export default Navbar;