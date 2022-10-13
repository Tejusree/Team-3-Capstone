import React from "react";
import './register.css';
import bgimage from '../assests/A.jpg';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Login from "./Login";

class RequestAccess extends React.Component{
    state={role:' ',msg:' ',validatename:false,userfocus:false,validatepassword:false,pwdfocus:false,validatematch:false,matchfocus:false,validateuid:false,uidfocus:false,validaterole:false,Employee:[],msgColor:false}
    email= React.createRef();
    username = React.createRef();
    password = React.createRef();
    cpassword = React.createRef();

    //function called on changing the role dropdown menu and updatin the role and validate role states
    setRole(e)
    {
       this.setState({role:e.target.value})
       this.setState({validaterole:true})
    }

    //function to validate username and update validatename state
    validateusername(e)
    {
       
        const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_-\s]{3,40}$/;
        const display = USER_REGEX.test(e.target.value);
        if(display)
        {
            this.setState({validatename:true})
        }
        else{
            this.setState({validatename:false})
        }
    }

    //function to validate the password using regex and updating the validatepassword state
    validatepassword(e)
    {
        const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        const display2 = PWD_REGEX.test(e.target.value);
        if(display2)
        {
            this.setState({validatepassword:true})
        }
        else
        {
            this.setState({validatepassword:false})
        }
    }

    //function to check whether confirm password matches with password and update validatematch state
    validatecpassword(e)
    {
        if(this.password.current.value === this.cpassword.current.value)
        {
            this.setState({validatematch:true})
        }
        else
        {
            this.setState({validatematch:false})
        }
    }

    //function to validate the entered userid and update validateuid state
    validateuserid(e)
    {
        let id = e.target.value;
        let arr = id.split("@");
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i] === "incedoinc.com")
            {
                this.setState({validateuid:true})
                break;
            }
            else
            {
                this.setState({validateuid:false})
            }
        }
    }

    //function called on form submittion to check any entries with entered username and if not save the entry 
    createEmployee(e)
    {
        e.preventDefault();
        console.log(this.state.validatename);
        console.log(this.state.validatepassword);
        console.log(this.state.validatematch);
        console.log(this.state.validateuid);
        console.log(this.state.validaterole);

        if(this.state.validatename === true && this.state.validatepassword === true && this.state.validatematch === true && 
            this.state.validaterole === true && this.state.validateuid === true)
        {
            console.log("entered create employee");
            var url = `http://localhost:8080/save`;
            let s = "Requested";
            let e = {
            name:this.username.current.value,
            password:this.password.current.value,
            role:this.state.role,
            status:s,
            username:this.email.current.value,
            activefrom:new Date().toLocaleDateString("es-CL")
            };
            var url2 = `http://localhost:8080/get/${this.email.current.value}`;

                fetch(url2)
                .then(response=>response.json())
                .then((response)=>{console.log(Object.keys(response).length)
                    if(Object.keys(response).length>0)
                    {
                        this.setState({msg:"User already exists with respective credentials"})
                    }
                } 
                ).catch((error)=>
                {
                fetch(url,{
                    //mode:'no-cors',
                    method:'POST',
                    headers:{'Content-Type':'Application/json'},
                    body:JSON.stringify(e)
                    }).then(response=>response.json()).then(result => this.setState({msg:'Request access successfully updated...'})); 
                    console.log(e);  
                    this.setState({msgColor:true})
            });

        }
        else
        {
            this.setState({msg:'Please enter the valid registration credentials'});
        }
        
     }
    render()
    {
        return <div style={{"position":"absolute","top":"0","bottom":"0","left":"0","right":"0","overflow-y":"scroll"}}>
               {/* <!----- Nav bar start -----> */}
               <div>
                <nav class="navbar navbar-dark bg-dark fixed-top">
                <div class="container-fluid">
                     {/*toggle button */}
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
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* <!----- Nav bar end -----> */}
      <br/>
      <br/>
               {/*Background image*/}
               <div className="form-container" style={{"background-image": `url(${bgimage})`,"backgroundRepeat":"no-repeat","background-size": "cover"}}>
               {/*Refister Form displayed in Request Access Page*/}
               <form onSubmit={(e)=>this.createEmployee(e)}>
                      <h3>Request Access</h3>
                {/* <label htmlFor="userid">
                    User_ID:
                </label> */}
                      <input id="userid" type="email" name="email" ref={this.email} required placeholder="User ID" onChange={(e)=>this.validateuserid(e)} onFocus={(e)=>this.setState({uidfocus:true})} onBlur={(e)=>this.setState({uidfocus:false})}/>
                      <p id="uidnote" className={!this.state.validateuid && this.state.uidfocus ? "instructions" : "offscreen"} style={{"font-weight":"Bold", "font-size" : "15px"}}>
                      <FontAwesomeIcon icon = {faInfoCircle}/>Please enter incedo mail id
                      </p>
                {/* <label htmlFor="name">
                    User_Name:
                </label> */}
                      <input id="name" type="text" name="name" ref={this.username} required placeholder="User Name" onChange={(e)=>this.validateusername(e)} onFocus={(e)=>this.setState({userfocus:true})} onBlur={(e)=>this.setState({userfocus:false})}/>
                      <p id="uinote" className={!this.state.validatename && this.state.userfocus ? "instructions" : "offscreen"} style={{"font-weight":"Bold", "font-size" : "15px"}}>
                      <FontAwesomeIcon icon = {faInfoCircle}/>4 to 24 characters .<br/>
                                                              Must begin with a letter.<br/>
                                                              Letters,numbers,underscores,hyphes are allowed.
                      </p>
                {/* <label htmlFor="password">
                    Password:
                </label> */}
                      <input id="password" type="password" name="password" ref={this.password} required placeholder="Password" onChange={(e)=>this.validatepassword(e)} onFocus={(e)=>this.setState({pwdfocus:true})} onBlur={(e)=>this.setState({pwdfocus:false})}/>
                      <p id = "pwdnote" className={ !this.state.validatepassword && this.state.pwdfocus ? "instructions":"offscreen"} style={{"font-weight":"Bold", "font-size" : "12px"}}>
                      <FontAwesomeIcon icon={faInfoCircle}/>8 to 24 characters.<br/>
                                                            Must include uppercase and lowercase letters , a number and a special character.<br/>
                                                            Allowed special characters:<span aria-label="exclamation mark">!</span>
                                                            <span aria-label="at symbol">@</span>
                                                            <span aria-label="hashtag">#</span>
                                                            <span aria-label="dollar sign">$</span>
                                                            <span aria-label="percent">%</span>
                        </p>
                {/* <label htmlFor="confirmpassword">
                    Confirm_Password:
                </label> */}
                        <input id="confirmpasword" type="password" name="confirmpassword" ref={this.cpassword} required placeholder="Confirm Password" onChange={(e)=>this.validatecpassword(e)} onFocus={(e)=>this.setState({matchfocus:true})}  onBlur={(e)=>this.setState({matchfocus:false})}/>
                        <p id = "pwdnote" className={ !this.state.validatematch && this.state.matchfocus?"instructions":"offscreen"} style={{"font-weight":"Bold", "font-size" : "15px"}}>
                        <FontAwesomeIcon icon={faInfoCircle}/>Must match the first password input field.
                        </p>
                {/* <label htmlFor="role">
                    Select the Role:
                </label> */}
                        <select id="role" name="user_type" onChange={(e)=>this.setRole(e)} style={{"height":"50px"}}>
                        <option value="default">Select Role</option>
                            <option value="Lead">Lead</option>
                            <option value="Admin">Admin</option>
                            <option value="Developer">Developer</option>
                            <option value="Employee">Employee</option>
                        </select>
                        <input  type="submit" value ="register now" name="submit"  className="form-btn" readOnly={true} style={{"height":"50px"}}/>
                        <p style ={{"fontSize" : "15px"}}>Already have an account?<a href="/login">    Login now</a></p>
                        {/*Message to display the register status */}
                        {
                             this.state.msgColor ? <span style={{"color":"green"}}>{this.state.msg}</span> :  <span style={{"color":"red"}}>{this.state.msg}</span>
                        }
               </form>
               </div>
               </div>

            
    }
}
export default RequestAccess;