import "./Main.css";
import hello from "../../assests/hello.jpg";
import React, { useContext, useEffect, useState } from 'react';
//import AuthComp from "../../pages/Authcomp";
import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import '../../pages/All.css'
import { useParams } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import AdminDashboard from "../../pages/AdminDashboard";

const Main = () => {
    
    const [data, setdata] = useState(null);
    //var temp1 = useContext(AuthComp);
    const params = useParams();
    var pmn = JSON.parse(localStorage.getItem("userpojo"));
    var role = JSON.parse(localStorage.getItem("userpojo"));
    var changeParam = params.username.replaceAll(' ','_');
    console.log(changeParam);
    console.log(role);
    useEffect(() => {
    fetch(`http://localhost:8080/getByUserName/${changeParam}`)
    .then (response => response.json())
    .then(data => { console.log (data)
        setdata(data) ;
        // if(data.role == "Admin")
        //     temp1.setisAdmin(true) 
        // if(data.role == "Lead")
        //     temp1.setisLead(true)
        // if(data.role == "Developer")
        //     temp1.setisDeveloper(true)
        // if(data.role == "Employee")
        //     temp1.setisEmployee(true)
       })
      },[])
    

      return (
        <div style={{ "position": "absolute", "top": "0", "bottom": "0", "left": "0", "right": "0", "overflow-y": "scroll" }}>
            {/* <!----- Nav bar start -----> */}
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
            {/* <!----- Nav bar end -----> */}
            <br />
            <br />
            <br />
            <main>
                <section class="p-4 d-flex justify-content-center w-100">
                    <div className="main__container">
                        <div className="main__title">
                            <img src={hello} alt="hello" />
                            <div className="main__greetings">
                                <h1> Hello User!</h1>
                                <p> Welcome to your profile page</p>
                            </div>
                        </div>

                        <div className="main__cards">
                            <div className="card1">
                                <i className="fa fa-user-o fa-2x text-lightblue"></i>
                                <div className="card-inner">
                                    <table className="table_new">
                                        <thead> </thead>
                                        <tbody>
                                            {data && (
                                                <>
                                                    <tr>
                                                        <td className="font-bold text-title1">User ID</td><td className="font-bold text-title">{data.id}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="font-bold text-title1" >User Name</td> <td className="font-bold text-title">{data.username}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="font-bold text-title1">Role</td><td className="font-bold text-title">{data.role}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="font-bold text-title1">Status</td><td className="font-bold text-title">{data.status}</td>
                                                    </tr>
                                                </>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
              {/* <!----- Footer start -----> */}
      <footer class="text-center text-lg-start bg-dark text-white fixed-bottom">
        <div class="text-center p-2">
          &copy; Copyright 2022 Incedo Inc.
        </div>
      </footer>
            {/* <!----- Footer end -----> */}
        </div>
    );
};

export default Main;