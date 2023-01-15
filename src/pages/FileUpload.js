import React from "react";
import axios from "axios";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Row, Card } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";

class Fileupload extends React.Component{

    state = {
        file : null
      }
      handlFile(e){
      
        let file = e.target.files[0]
        this.setState({file : file})
      }
      
      createAllowanceDashBoard(e)
      {
         var project1 = "Leave_India";
         var project2 = "Holiday_India";
         var url = `http://localhost:8080/saveAllowanceDashBoard/${project1}/${project2}`;
         fetch(url).then(response=>response.json()).then(alert("Allowance Dashboard created successfully!"));


      }

      handleUpload(e){
      
         let file  = this.state.file;
         let formdata  = new FormData()
         formdata.append('file', file)
         formdata.append("name","ELMANDOUR AMINE")
       axios({

        url :'http://localhost:8080/allowancetable/allowances/',
        method :'POST',
      
        data : formdata
       }).then((res)=>{}).then(alert("File uploaded succesfully!"))
      }
    render()
    {
      return <div style={{ "position": "absolute", "top": "0", "bottom": "0", "left": "0", "right": "0", "overflow-y": "scroll" }}>
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
                                  <LinkContainer to="/superuser">
                                      <Nav.Link><ImIcons.ImUserTie />&ensp;Super User Dashboard</Nav.Link>
                                  </LinkContainer>
                              </li>
                              <li class="nav-item">
                                  <LinkContainer to="/fileupload">
                                      <Nav.Link><SiIcons.SiGooglesheets />&ensp;Upload Timesheet</Nav.Link>
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
      <div class="container text-center border border-dark bg-info">
          <h1>Upload Timesheet</h1>
      </div>
      <br/>
      <br/>
      <div class="d-flex flex-column" style={{"align-items":"center"}}>
          <div class="p-2"><input type="file" onChange={(e) => this.handlFile(e)}></input></div>
          <br/>
          <div class="p-2"><button id="button" type="button" class="btn btn-success" onClick={(e) => this.handleUpload(e)}>UploadFile</button></div>
          <div class="p-2"><button id="button" type="button" class="btn btn-warning" onClick={(e) => this.createAllowanceDashBoard(e)}>CreateAllowanceDashBoardTable</button></div>
      </div>

      {/* <!----- Footer start -----> */}
      <footer class="text-center text-lg-start bg-dark text-white fixed-bottom">
          <div class="text-center p-2">
              &copy; Copyright 2022 Incedo Inc.
          </div>
      </footer>
      {/* <!----- Footer end -----> */}
  </div>
}
}
export default Fileupload;