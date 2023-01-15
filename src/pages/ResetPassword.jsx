import axios from 'axios';
import React, { Component, useState } from 'react';
import { useLocation } from 'react-router-dom';
import unlock from "../image/unlock.jpg";
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../App.css'
//import './register.css';
import bgimage from "../assests/A.jpg"
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



export default function ResetPassword() {
    
  const [userOtp, setuserOtp] = useState("")
  const [newPass, setnewPass] = useState("")
  const [confirmPass, setconfirmPass] = useState("")
  
  const [passMatch, setpassMatch] = useState(false)
  const [passUnmatch, setpassUnmatch] = useState()
  const [otpUnmatch, setotpUnmatch] = useState(false)
  const [validatepassword,setValidatepassword] = useState(' ')
  const [passwordfocus,setPasswordfocus] = useState(' ')

  let navigate = useNavigate(); 
  
  let data = useLocation();
  function checkOtp(event){
      setuserOtp(event.target.value)

      if(event.target.value.length <= 5 || event.target.value.length >=5){
          if(event.target.value != data.state.otp){
          setotpUnmatch(true);
          }
          else{
              setotpUnmatch(false);
          }
      }
      
  }
  //function to validate the password with regex
  function validatePassword(event)
  {
     setnewPass(event.target.value);
     const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
      const display2 = PWD_REGEX.test(event.target.value);
      if(display2)
      {
          setValidatepassword(true);
      }
      else
      {
          setValidatepassword(false);
      }

  }
  async function checkPass(e){
    
      e.preventDefault();
      if(newPass.length >0 && confirmPass.length >0 && !otpUnmatch){
      if(newPass!=confirmPass)
      {
          setpassUnmatch(true); }

      else{

         
          const salt = await bcrypt.genSalt(6);
          const hashedPass = await bcrypt.hash(newPass, salt);

          
          
          
          setpassMatch(true);
          setpassUnmatch(false);

          var formBodyData = new FormData();
          formBodyData.append('email', data.state.email);
          formBodyData.append('pass', hashedPass);

         const res2=await axios({
          method:"POST",
          url:"http://localhost:8080/updatepassword",
          data:formBodyData,
          headers:{"Content-Type":"multipart/form-data"}
      })
      if(res2.data){
          setTimeout(
              () => {navigate("/login")}, 2500
             )
      }

      }
      

  }
  else{
      window.alert("Invalid OTP")
  }
 
}
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

        <div>

        <div className="App" style={{"background-image": `url(${bgimage})`,"backgroundRepeat":"no-repeat","background-size": "cover"}}>
                <div className="reset-App">

                <div>
                  

                  
                   

                    <div className="imgs">
                        <div className="container-image">
                            <img src={unlock} className="unlock"></img> 
                        </div>
                        
                    </div>
                    <div>
                        <h2 className="text-forgotpass" >Reset Password</h2>
                    
                        
                        <form onSubmit = {checkPass}>
            
                        <div>
                            
                            {/* <h3 className="text-otp" >Enter OTP</h3> */}
                            <input required value={userOtp}  onChange = {(event) => checkOtp(event)} type="text" placeholder="OTP"className="otp" style={{ "background": "#003049", "color": "#eee", "width": "300px", "height": "33px", "fontSize": "17px", "border-radius": "5px" }}/>
                            {

                              otpUnmatch && <p className='msgdisplay'><span style={{"font-weight": "bold", "color":"crimson", "font-size":"12px"}}>OTP is Incorrect.</span></p>  

                            }
                        </div>
                        <br/>
                        
                        <div>
                            {/* <h3 className="text-newpass" >New Password</h3> */}
                            {
                                otpUnmatch? <input readOnly required onChange = {(event) => setnewPass(event.target.value)} type =  "password" placeholder="  Password" className="password-field"/> : <input  required onChange = {(event) => validatePassword(event)} type =  "password" placeholder="  Password" style={{ "background": "#003049", "color": "#eee", "width": "300px", "height": "33px", "fontSize": "17px", "border-radius": "5px" }}className="password-field" onFocus={(e)=>setPasswordfocus(true)} onBlur={(e)=>setPasswordfocus(false)}/>
                            }
                             <p id = "pwdnote" className={ !validatepassword && passwordfocus ? "instructions":"offscreen"}>
                             <span className="validation">   <FontAwesomeIcon icon={faInfoCircle}/><span style={{"font-weight": "bold", "color":"crimson", "font-size":"12px"}}>8 to 24 characters.<br/>
                                                                       Must include uppercase and lowercase letters , a number and a special character.
                                                                      Allowed special characters:<span aria-label="exclamation mark">!</span>
                                                            <span aria-label="at symbol">@</span>
                                                            <span aria-label="hashtag">#</span>
                                                            <span aria-label="dollar sign">$</span>
                                                           <span aria-label="percent">%</span></span> </span>
                                </p> 
                           {console.log(newPass)}
                        </div>
                        <br/>
                        <div>
                            {/* <h3 className="text-confirmpass">Confirm Password</h3> */}
                            {
                                otpUnmatch? <input readOnly required onChange = {(event) => setconfirmPass(event.target.value)} type =  "password" placeholder="  Confirm Password" className="password-field"/> : <input  required onChange = {(event) => setconfirmPass(event.target.value)} type =  "password" placeholder="Confirm Password" style={{ "background": "#003049", "color": "#eee", "width": "300px", "height": "33px", "fontSize": "17px", "border-radius": "5px" }} className="password-field"/>
                             
                             
                            }
                        </div>
                        <br/>
                        <button type='submit' className="btn btn-success reset">Submit</button> 
                        {/* style={{ "background": "#fbd0d9", "color": "crimson" }} */}
                        </form>
                        {
                           passUnmatch && <p className="msgdisplay">Those passwords didn't match. Try Again! </p>
                        }
                        {
                           passMatch && <p className='msgdisplayg'>Success! You've reset your password.</p>
  
                        }
                        <div>
                        
                        </div>
                    </div>
                  </div> 
                </div>
           </div>

       </div>
       {/* <!----- Footer start -----> */}
      <footer class="text-center text-lg-start bg-dark text-white fixed-bottom">
        <div class="text-center p-2">
          &copy; Copyright 2022 Incedo Inc.
        </div>
      </footer>
            {/* <!----- Footer end -----> */}
       </div>
    )
}        