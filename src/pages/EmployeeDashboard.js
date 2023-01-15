import React, { useEffect,useState } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav,Card,Row } from 'react-bootstrap'
import './All.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import {CSVLink} from 'react-csv';

const EmployeeDashboard =()=> {
    
         
        const [Udata,setUdata] = useState([]);
        const [projectname,setProjectname] = useState(' ');
        const [startdate,setStartdate] = useState(' ');
        const [enddate,setEnddate] = useState(' ');

        // //fetching Employee complete data

         useEffect(() => {
         const username = JSON.parse(localStorage.getItem("userpojo"));
         console.log(username);
         const changeusername = username.replaceAll(" ","_");
         fetch(`http://localhost:8080/getAllowanceDashBoardByUserName/${changeusername}`)
         .then (response => response.json())
         .then(data => {console.log (data)
             setUdata(data)});
           },[])

        // //fetching data based on ProjectName, Startdate and Enddate

         useEffect(()=>{
            const username = JSON.parse(localStorage.getItem("userpojo"));
            const changeusername = username.replaceAll(" ","_");
             if(projectname !== ' ' && startdate !== ' ' && enddate !== ' ')
            {
                var url = `http://localhost:8080/getEmployeeAllowanceDashBoard/${projectname}/${startdate}/${enddate}/${changeusername}`;
                fetch(url).then(response=>response.json()).then(data=>{console.log(data) 
                                                                        setUdata(data)});
             }
        },[enddate])

        //localstorage projectmanagername lead(name)
         const pmn = JSON.parse(localStorage.getItem("userpojo"));

         //headers for downloaded CSV file
         const headers = [
            {label:'EmployeeName', key:'name'},
            {label:'EmployeeSAPId', key:'sapid'},
            {label:'ProjectHours', key:'projecthours'},
            {label:'Holiday/LeaveHours', key:'holidayleavehours'},
            {label:'AfterNoonShiftDays', key:'afternoonshiftdays'},
            {label:'NightShiftDays', key:'nightshiftdays'},
            {label:'DaysEligibleForTA', key:'dayseligibleforta'},
            {label:'TransportAllowance', key:'transportallowance'},
            {label:'TotalAllowance', key:'totalallowance'},
            {label:'ApprovalStatus', key:'status'},
            {label:'PeriodStart', key:'startdate'},
            {label:'PeriodEnd', key:'enddate'},
            {label:'ProjectName', key:'projectname'},
            {label:'ProjectManagerName', key:'projectmanagername'}
          ]

          const csvreport = {
            filename:'Employee.csv',
            headers:headers,
            data:Udata
         };
  
        
        return <div style={{ "position": "absolute", "top": "0", "bottom": "0", "left": "0", "right": "0", "overflow-y": "scroll"}}>
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

            <div class="container text-center border border-dark" style={{ "background-color": "orange", textAlign: "center" }}>
                <h1>Employee Dashboard</h1>
            </div>
            <br />
            <div id="main" class="d-flex justify-content-evenly">
                <div class="col project">
                    <select aria-label="Default select example" style={{ "height": "36px" }} onChange={(e)=>setProjectname(e.target.value)}>
                        <option selected>Project</option>
                        <option value="Digital">Digital</option>
                        <option value="Enterprise Platforms">Enterprise Platforms</option>
                        <option value="CET">CET</option>
                        <option value="Data">Data</option>
                    </select>
                </div>
                <div class="col">
                    <label>From</label>&emsp;
                    <input type='date' onChange={(e)=>setStartdate(e.target.value)} style={{"height":"36px"}}/>
                </div>
                <div class="col">
                    <label>To</label>&emsp;
                    <input type="date" onChange={(e)=>setEnddate(e.target.value)} style={{"height":"36px"}}/>
                </div>
            </div>
            <br />
            <div class="container-fluid">
                <form class="d-flex justify-content-end ">

                </form>
            </div>


            <br /><br />
            <div>
            <div className="container">
                <table class="table table-striped" border="1">
                    <thead class="table-success">
                        <tr>
                    
                            <th className="text-center">Name</th>
                            <th className="text-center">SAP ID</th>
                            <th className="text-center">Project hours</th>
                            <th className="text-center">Holiday /leave hours</th>
                            <th className="text-center">Afternoon Shift Days</th>
                            <th className="text-center">Night Shift Days</th>
                            <th className="text-center">Days eligible for TA</th>
                            <th className="text-center">Approval Status</th>
                            <th className="text-center">Transport Allowance</th>
                            <th className="text-center">Total Allowance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Udata.map(c => <tr>
                            <React.Fragment key = {c.id}>
                            <td className="text-center">{c.name}</td>
                            <td className="text-center">{c.sapid}</td>
                            <td className="text-center">{c.projecthours}</td>
                            <td className="text-center">{c.holidayleavehours}</td>
                            <td className="text-center">{c.afternoonshiftdays}</td>
                            <td className="text-center">{c.nightshiftdays}</td>
                            <td className="text-center">{c.dayseligibleforta}</td>
                            <td className="text-center">{c.status}</td>
                            <td className="text-center">{c.transportallowance}</td>
                            <td className="text-center">{c.totalallowance}</td>
                            </React.Fragment>
                            
                        </tr>)}
                    </tbody>
                </table>
                
                </div>
                <br /><br />
                <div class="d-flex justify-content-between" style={{ "padding-left": "1.5cm", fontWeight: "bold" }}>
                    
                    <br />
                    <button class="btn btn-success" style={{ "width": "140px" }}><CSVLink {...csvreport} style={{ "text-decoration": "none", "color": "white" }}>Export to csv <i class="fa fa-download" aria-hidden="true"></i></CSVLink></button>
                    <br />
                </div>
            </div>
            <br />
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
    
}

export default EmployeeDashboard;

{/* // import React from 'react';
// function Employee ()  {
//   return (
//     <div className='employee'>
//         <h1>Employee</h1>
//         </div>
//   );
// }
// export default Employee; */}