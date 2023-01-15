import axios from 'axios';
import React, { Component, useState } from 'react';
import lock from '../image/lock.png';
import mail from '../image/mail.jpg';
import Popup from 'reactjs-popup';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import 'reactjs-popup/dist/index.css';
import '../App.css'
import bgimage from "../assests/A.jpg"
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [userRecipient, setuserRecipient] = useState("")
  const [mailSuccess, setmailSuccess] = useState(false)
  const [mailexist, setmailexist] = useState(true)
  let navigate = useNavigate();
  const setEmail = (event) => {
    setuserRecipient(event.target.value)
  }


  const handleSubmit = async () => {

    var formBodyData2 = new FormData();
    formBodyData2.append('userRecipient', userRecipient);
    const res1 = await axios({
      method: "POST",
      url: "http://localhost:8080/mailExist",
      data: formBodyData2,
      headers: { "Content-Type": "multipart/form-data" }
    })

    if (res1.data == true) {

      let otp = generateOtp();

      var formBodyData=new FormData();
          formBodyData.append('msgBody', "Dear Incedoer,\n\nThe OTP to reset your password is : " + otp + "\n\nPlease enter this OTP in the reset password page to change your password. \n\n If you are facing any issues accessing the reset password page, then click on the below link to change your password. \n http://localhost:3000/resetpassword" + "\n\n\nRegards,\nTeam Admin\nShift-Allowance App | http://localhost:3000");
          formBodyData.append('subject', "OTP to reset your password");
          formBodyData.append('recipient', userRecipient)

        const res2=await axios({
            method:"POST",
            url:"http://localhost:8080/mailWithOtp",
            data:formBodyData,
            headers:{"Content-Type":"multipart/form-data"}
        })

      if (res2.data == "Mail sent Successfully") {
        setmailSuccess(true);
        console.log('hi');
        setTimeout(
          () => { navigate("/resetpassword", { state: { otp: otp, email: userRecipient } }) }, 5000
        )
      }
    }

    else {
      setmailexist(false);
    }
  }

  const generateOtp = () => {
    let otp = "";
    for (let i = 0; i < 5; i++) {
      otp += Math.floor((Math.random() * 10));

    }
    return otp;
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
      <div className="App" style={{"background-image": `url(${bgimage})`,"backgroundRepeat":"no-repeat","background-size": "cover"}}>
        <div className="sub-App">
          <div>
            {
              mailSuccess && window.alert("Mail has been sent successfully!")
            }
            {
              !mailexist && <h3 style={{"color":"crimson"}}>Mail-id doesn't exist</h3>
            }
            <div className="imgs">
              <div className="container-image">
                <img src={lock} className="lock"></img>
              </div>
            </div>
            <div>
              <h2 className="text-forgotpass">Forgot Password?</h2>
              <h3 className="info">Enter your registered mail-id to reset your password</h3>
              <div>
                <GrIcons.GrMail />&ensp;<input onChange={(event) => setEmail(event)} type="email " placeholder="Email-id" className="mail-id" style={{ "background": "#003049", "color": "#eee", "width": "300px", "height": "33px", "fontSize": "17px", "border-radius": "5px" }} />
              </div>
              <h1>
              </h1>
              <br />
              <div>
              <button onClick= {handleSubmit} className="btn btn-success fogpass">Submit</button>
              </div>
              
              <div>
                <p className='forgotspace'>
                
                <a href="/login" className="aforpass">Back to login?</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="text-center text-lg-start bg-dark text-white">
        <div class="text-center p-2">
          &copy; Copyright 2022 Incedo Inc.
        </div>
      </footer>
    </div>


  )
}