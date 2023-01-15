import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import bgimage from '../assests/B.jpg';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'

const Homepage = () => {
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
                </ul>

              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* <!----- Nav bar end -----> */}
      <br />
      <br />
      <main style={{"background-image": `url(${bgimage})`,"background-size":"cover"}}>
        <br />
        <br />
        <br />
        <br />
        <section class="p-4 d-flex justify-content-center w-100">
          <br />
                <div className="main__container">
                  <div className="main__title">
                    <div className="main__greetings">
                      <br />
                      <br />
                      <h1 style={{ "color": "white","text-shadow": "2px 2px 4px black","font-weight":"bold" }}>Welcome to Shift - Allowance App</h1>
                    </div>
                  </div>
          </div>
        </section>
        <br />
        <br />
        <br />
      </main>
      {/* Footer */}
      <footer className="text-center text-lg-start bg-dark text-white">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
           
            <h3>incedo</h3>
          </div>
          <div>

            <section className="mb-4">

              <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/IncedoInc" target="_blank" role="button"
              ><i className="fab fa-facebook-f"></i
              ></a>


              <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/IncedoInc" target="_blank" role="button"
              ><i className="fab fa-twitter"></i
              ></a>


              <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/company/incedo-inc/" target="_blank" role="button"
              ><i className="fab fa-linkedin-in"></i
              ></a>

              <a className="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/channel/UC6LjAUc6LyvLSwrEOMJaH_Q" target="_blank" role="button"
              ><i className="fab fa-youtube"></i
              ></a>

              <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/incedoinc/" target="_blank" role="button"
              ><i className="fab fa-instagram"></i
              ></a>

              <a className="btn btn-outline-light btn-floating m-1" href="https://incedoin.sharepoint.com/:p:/r/sites/IncedoCapstoneprojectTeam3/_layouts/15/doc2.aspx?action=edit&sourcedoc=%7Be99d08d1-59e5-4f2a-8c90-637e03443a2e%7D&wdOrigin=TEAMS-WEB.teams.chiclet&wdExp=TEAMS-CONTROL" target="_blank" role="button"
              ><RiIcons.RiFilePpt2Fill/>
              </a>

              <a className="btn btn-outline-light btn-floating m-1" href="https://incedoin-my.sharepoint.com/:x:/g/personal/teja_mb_incedoinc_com/EV95FfEblQJIn3FD1iHJLr4BNtGA4ZTK2FqyhEWgjOmFPw?e=GqOlQx" target="_blank" role="button"
              ><SiIcons.SiGooglesheets/>
              </a>

            </section>

          </div>
        </section>
        <div className="text-center p-4">
          &copy; Copyright 2022 Incedo Inc.
        </div>
      </footer>
    </div>
  )
}

export default Homepage;