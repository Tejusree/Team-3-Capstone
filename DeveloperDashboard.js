import React, {useEffect, useState} from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Card, Navbar, Nav } from 'react-bootstrap'
//import './All.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
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
                                        <Nav.Link><ImIcons.ImUserTie />&ensp;Admin Dashboard</Nav.Link>
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
                                    <LinkContainer to="/login">
                                        <Nav.Link><ImIcons.ImUserTie />&ensp;Logout</Nav.Link>
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
                <Row>
                 <Card className="mt-2">
                   <Card.Body>
                    <table class="table text-center table-striped" >
                        <thead className="bg-info">
                            <tr>
                                <th scope='col'>User ID</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Active From</th>
                                <th scope='col'>Role</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>User Name</th>
                               
                            </tr>
                        </thead>
                        <tbody className="tbody-light">
                        {data && (data.map(item =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.activefrom}</td>
                                <td>{item.role}</td>
                                <td>{item.status}</td>
                                <td>{item.username}</td>
                               
                            </tr>
                             ))}
                        </tbody>

                    </table>
                    </Card.Body>
          </Card>
          </Row>
                    <div className="card text-center">
          <div className="card-body">
            <a href="/requestaccess" className="btn btn-primary">Add</a>
          </div>
        </div>
                </div>


            </div>

            <footer class="text-center text-lg-start bg-dark text-white">
                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div class="me-5 d-none d-lg-block">
                        <h3>incedo</h3>
                    </div>
                    <div>

                        <section class="mb-4">

                            <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i class="fab fa-facebook-f"></i
                            ></a>


                            <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i class="fab fa-twitter"></i
                            ></a>


                            <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i class="fab fa-google"></i
                            ></a>


                            <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i class="fab fa-instagram"></i
                            ></a>


                            <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i class="fab fa-linkedin-in"></i
                            ></a>


                            <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i class="fab fa-github"></i
                            ></a>
                        </section>

                    </div>
                </section>
                <section class="">
                    <div class="container text-center text-md-start mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="fw-bold mb-4">
                                    Company
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Company Overview</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Incedo Belief System</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Leadership</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Winning In The Digital Age</a>
                                </p>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="fw-bold mb-4">
                                    Services
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">AI and Data</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Cloud Transformation</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Digital Engineering</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Experience Design</a>
                                </p>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="fw-bold mb-4">
                                    Industries
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Financial Services</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Life Sciences</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Product Engineering</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Telecom</a>
                                </p>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="fw-bold mb-4">
                                    Platforms
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Incedo Lighthouse<sup>TM</sup></a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">IncedoPay</a>
                                </p>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="fw-bold mb-4">
                                    Insights
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Case Studies</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">White Papers</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Blogs</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset text-decoration-none">Videos</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="text-center p-4">
                    &copy; Copyright 2022 Incedo Inc.
                </div>
            </footer>
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