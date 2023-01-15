import React from "react";
import "./register.css";
import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { BrowserRouter,  Link} from "react-router-dom";
import { Route, Routes } from "react-router";
import RequestAccess from "./RequestAccess";
import bgimage from '../assests/A.jpg';
import logo from '../assests/Incedologo.jpg'
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import {Navigate} from "react-router-dom";
import bcrypt from "bcryptjs";

class Login extends React.Component{
      state={msg:' ',role:' ',username:' ',password:' ',validateusername:false,validatepassword:false,useridfocus:false,pwdfocus:false,Employee:{id:' ',name:' ',role:' ',status:' ',username:' '},lead:null,developer:null,employee:null,admin:null,error:null,msgColor:' ',superuser:null}
      
      //function to update states username and validateusername based on username entered
      setUserName(e)
      {
          this.setState({username:e.target.value});
          console.log(this.state.username);
          const id = e.target.value;
          const display = id.split("@");
          for(let i=0;i<display.length;i++)
          {
            if(display[i] === "incedoinc.com")
            {
                this.setState({validateusername:true});
            }
            else
            {
                this.setState({validateusername:false});
            }
          }
      }

      //function to update states password and validate password based on password entered and validate password using regex
      setPassword(e)
      {
        this.setState({password:e.target.value});
        console.log(this.state.password);
        const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        this.state.validatepassword = PWD_REGEX.test(this.state.password);
      }


      //function to fetch entries based on username entered in loginform , and check password matching and updating states like developer,employee,lead and admin
      //comparing  entered password with hashed password in database 
      async getEmployee(e)
      {
        e.preventDefault();
        if(this.state.validateusername === true && this.state.validatepassword === true)
        {
          console.log("Entered get Employee");
          console.log(this.state.username+" "+this.state.password);
          var url = `http://localhost:8080/get/${this.state.username}`;
          fetch(url).then(Employee2 => Employee2.json()) 
          .then( async (Employee2)=>{
            console.log(Employee2.role);
            const validPassword = await bcrypt.compare(this.state.password,Employee2.password);
          if(validPassword)
          {
            if(Employee2.role === "Developer" && Employee2.status === "Active")
           {
              console.log("Developer");
              try
              {
                   this.setState({developer:true});
                   this.setState({role:"Developer"});
              }
              catch(error)
              {
                this.setState({error:true});
              }
            }
            else if(Employee2.role === "Lead" && Employee2.status === "Active")
           {
               console.log("Lead");
               try
               {
                 this.setState({lead:true});
                 this.setState({role:"Lead"});
               }catch(error)
               {
                 this.setState({error:true});
               }
            }
            else if(Employee2.role === "Employee" && Employee2.status === "Active")
           {
               console.log("Employee");
               try
               {
                   this.setState({employee:true});
                   this.setState({role:"Employee"});
               }
               catch(error)
               {
                    this.setState({error:true});
               }
            }
            else if(Employee2.role === "Admin" && Employee2.status === "Active")
           {
                 console.log("Admin");
                 try
                 {
                    this.setState({admin:true});
                    this.setState({role:"admin"});
                 }
                 catch(error)
                 {
                    this.setState({error:true});
                 }
            }
            else if(Employee2.role === "SuperUser" && Employee2.status === "Active")
           {
                 console.log("SuperUser");
                 try
                 {
                    this.setState({superuser:true});
                    this.setState({role:"superuser"});
                 }
                 catch(error)
                 {
                    this.setState({error:true});
                 }
            }
            else{
            this.setState({msg:"Your request has not been activated!"});
            this.setState({msgColor:false});
            }
            this.setState({Employee:Employee2});

            //setting up the localstorage to use in other components of Application 
            localStorage.setItem('userpojo',JSON.stringify(Employee2.name));
            localStorage.setItem('userpojorole',JSON.stringify(Employee2.role));
            console.log("setted the state of employee");
          }
          else
          {
              this.setState({msg:"Your Password is incorrect!"});
              this.setState({msgColor:false});
          }
        }).catch((error)=>{
          console.log(error);
          this.setState({msg:"Please Register! To do so, go to Register page"});
          this.setState({msgColor:false});
         
      });
    }
    else{
      this.setState({msg:"Please enter valid credentials"});
      this.setState({msgColor:false});
    }
  }
      render()
      {
        // let {user,error} = this.state;
        // var un = this.state.username;
        // var pd = this.state.password;
         return <>
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
                         <LinkContainer to="/">
                            <Nav.Link><AiIcons.AiOutlineHome />&ensp;Home</Nav.Link>
                         </LinkContainer>
                        </li>
                        <li class="nav-item">
                        <LinkContainer to="/login">
                            <Nav.Link><BiIcons.BiLogInCircle />&ensp;Login</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li class="nav-item">
                        <LinkContainer to="/requestaccess">
                            <Nav.Link><FaIcons.FaRegRegistered />&ensp;Register</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li class="nav-item">
                        <LinkContainer to="/forgotpassword">
                            <Nav.Link><FaIcons.FaLock />&ensp;Forgot Password</Nav.Link>
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
                 <div className="form-container" style={{"background-image": `url(${bgimage})`,"backgroundRepeat":"no-repeat","background-size": "cover"}}>
                  {console.log(this.state.Employee.name)}

                  {/*code to navigate to profile page from login based on role*/}
                  {this.state.developer && (<Navigate to={`/Profile/${this.state.Employee.name}`}  replace={true}/>)}
                  {this.state.lead && (<Navigate to={`/Profile/${this.state.Employee.name}`}  replace={true}/>)}
                  {this.state.employee && (<Navigate to={`/Profile/${this.state.Employee.name}`}  replace={true}/>)}
                  {this.state.admin && (<Navigate to={`/Profile/${this.state.Employee.name}`} replace={true}/>)}
                  {this.state.superuser && (<Navigate to={`/Profile/${this.state.Employee.name}`} replace={true}/>)}

                  {/*Login Form takes the Username and Password*/}
                  <form onSubmit={(e)=>this.getEmployee(e)}>
                      <img src={logo} className="img" style={{ "width": "35%" }} /><br /><br />
                      <label>
                          Username:
                      </label>
                      <input type="email" className="login" name="email" required placeholder = "Username" onChange={(e)=>this.setUserName(e)} onFocus={(e)=>this.setState({useridfocus:true})} onBlur={(e)=>this.setState({useridfocus:false})}/>
                      <p id = "emailnote" className={ !this.state.validateusername && this.state.useridfocus?"instructions":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/><span style={{"font-weight": "bold", "color":"crimson", "font-size":"12px"}}>Please enter the incedo mail id.</span>
                      </p>
                      <label>
                          Password:
                      </label>
                      <input type="password" className="login" name="password" required placeholder = "Password" onChange={(e)=>this.setPassword(e)} onFocus={(e)=>this.setState({pwdfocus:true})} onBlur={(e)=>this.setState({pwdfocus:false})}/><br/><br/>
                      <p id = "pwdnote" className={ !this.state.validatepassword && this.state.pwdfocus?"instructions":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/><span style={{"font-weight": "bold", "color":"crimson", "font-size":"12px"}}>8 to 24 characters.<br/>
                                                            Must include uppercase and lowercase letters , a number and a special character.<br/>
                                                            Allowed special characters:<span aria-label="exclamation mark">!</span>
                                                            <span aria-label="at symbol">@</span>
                                                            <span aria-label="hashtag">#</span>
                                                            <span aria-label="dollar sign">$</span>
                                                            <span aria-label="percent">%</span></span>
                                                            </p>
                      <button type="submit" className="btn btn-success log">SIGN IN</button><br/><br/>
                      {/*Route to Forget Password*/}
                      <a href="/forgotpassword">Forgot Password?</a><a href="/requestaccess" id="nura">New User? Register</a><br/>
                      {/*Message to display the Login status*/}
                      {/* {
                         this.state.msg
                      } */}
                      {this.state.msgColor ?'':<div className="msgdisplay">{this.state.msg}</div> }
                      
                 </form>
                 </div>
                 {/* <!----- Footer start -----> */}
            <footer class="text-center text-lg-start bg-dark text-white fixed-bottom">
                <div class="text-center p-2">
                    &copy; Copyright 2022 Incedo Inc.
                </div>
            </footer>
            {/* <!----- Footer end -----> */}
                 </div>
                 </> 
      }
}
export default Login; 