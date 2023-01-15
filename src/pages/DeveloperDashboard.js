import React, {useEffect, useState} from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Card, Navbar, Nav } from 'react-bootstrap'
//import './All.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
//import './DeveloperDashboard.css'

const DeveloperDashboard = () => {
    
    const [data, setdata] = useState(null);
    const pmn = JSON.parse(localStorage.getItem("userpojo"));
    useEffect(() => {
    fetch(`http://localhost:8080/getdata`)
    .then (response => response.json())
    .then(data => {console.log (data)
        setdata(data)})
      },[])


        return <div style={{ "position": "absolute", "top": "0", "bottom": "0", "left": "0", "right": "0", "overflow-y": "scroll" }}>
            <div>
                <nav class="navbar navbar-dark bg-dark fixed-top">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand" href="#"><span class="orange">incedo</span></a>
                        <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel"><span class="orange">incedo</span></h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <LinkContainer to={`/profile/${pmn}`}>
                                        <Nav.Link><MdIcons.MdSpaceDashboard />&ensp;Profile</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li class="nav-item">
                                        <LinkContainer to="/admin">
                                            <Nav.Link><RiIcons.RiAdminFill />&ensp;Admin Dashboard</Nav.Link>
                                        </LinkContainer>
                                    </li>
                                <li class="nav-item">
                                    <LinkContainer to="/lead">
                                        <Nav.Link><BiIcons.BiSpreadsheet />&ensp;Allowance Dashboard</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li class="nav-item">
                                    <LinkContainer to="/developer">
                                        <Nav.Link><AiIcons.AiTwotoneTool />&ensp;Developer Dashboard</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li class="nav-item">
                                    <LinkContainer to="/employee">
                                        <Nav.Link><FaIcons.FaUserAlt />&ensp;Employee Dashboard</Nav.Link>
                                    </LinkContainer>
                                </li> 
                                <li class="nav-item">
                                        <LinkContainer to="/superuser">
                                            <Nav.Link><ImIcons.ImUserTie />&ensp;Super User Dashboard</Nav.Link>
                                        </LinkContainer>
                                    </li>
                                    <li class="nav-item">
                                        <LinkContainer to="/logout">
                                            <Nav.Link><BiIcons.BiLogOutCircle />&ensp;Logout</Nav.Link>
                                        </LinkContainer>
                                    </li>
                                        
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <br />
            <br />
            <br />
            <div>
            <div class="container text-center border border-dark" style={{ "background-color": "orange" }}>
                <h1>Developer Dashboard</h1>
            </div>
            <br />
                <div class="container">
               
                    <table class="table text-center table-striped" >
                        <thead className="bg-info">
                            <tr>
                                <th scope='col' className="text-center">User ID</th>
                                <th scope='col' className="text-center">Name</th>
                                <th scope='col'className="text-center">Active From</th>
                                <th scope='col'className="text-center">Role</th>
                                <th scope='col' className="text-center">Status</th>
                                <th scope='col' className="text-center">User Name</th>
                               
                            </tr>
                        </thead>
                        <tbody className="tbody-light">
                        {data && (data.map(item =>
                            <tr>
                                <td className="text-center">{item.id}</td>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.activefrom}</td>
                                <td className="text-center">{item.role}</td>
                                <td className="text-center">{item.status}</td>
                                <td className="text-center">{item.username}</td>
                               
                            </tr>
                             ))}
                        </tbody>

                    </table>
                    <br/>
                    <div className="text-center">
          <div>
            <a href="/requestaccess" className="btn btn-primary">Add</a>
          </div>
        </div>
                </div>


            </div>
            <br/>
      <br/>
      <br/>
            {/* <!----- Footer start -----> */}
      <footer class="text-center text-lg-start bg-dark text-white fixed-bottom">
        <div class="text-center p-2">
          &copy; Copyright 2022 Incedo Inc.
        </div>
      </footer>
            {/* <!----- Footer end -----> */}
        </div>
    
};
export default DeveloperDashboard;
{/* // import React from 'react';
// function Developer() {
//   return (
//     <div className='developer'>
//         <h1>developer</h1>
//         </div>
//   );
// }
// export default Developer; */}