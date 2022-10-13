import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
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

              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fab fa-facebook-f"></i
              ></a>


              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fab fa-twitter"></i
              ></a>


              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fab fa-google"></i
              ></a>


              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fab fa-instagram"></i
              ></a>


              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fab fa-linkedin-in"></i
              ></a>


              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fab fa-github"></i
              ></a>
            </section>

          </div>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="fw-bold mb-4">
                  Company
                </h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Company Overview</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Incedo Belief System</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Leadership</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Winning In The Digital Age</a>
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="fw-bold mb-4">
                  Services
                </h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">AI and Data</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Cloud Transformation</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Digital Engineering</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Experience Design</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Industries
                </h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Financial Services</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Life Sciences</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Product Engineering</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Telecom</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Platforms
                </h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Incedo Lighthouse<sup>TM</sup></a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">IncedoPay</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Insights
                </h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Case Studies</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">White Papers</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Blogs</a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">Videos</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4">
          &copy; Copyright 2022 Incedo Inc.
        </div>
      </footer>
    </div>
  )
}

export default Homepage