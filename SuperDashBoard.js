import React, { useState,useMemo } from "react";
import { useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Row, Card } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
//import '../All.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import Pagination2 from "./Pagination2";
import Pagination from "./Pagination";
import { FaArrowUp, FaArrowDown} from "react-icons/fa";


const SuperDashBoard = () => {

    const [filterVal, setFilterVal] = useState('');
    const [searchApiData, setSearchApiData] = useState([]);

    const [Udata, setUData] = useState([]);
    const [projectname, setProjectName] = useState(' ');
    const [startdate, setStartdata] = useState(' ');
    const [enddate, setEnddate] = useState(' ');
    const [approvalstatus, setApprovalstatus] = useState(' ');
    const pmn = JSON.parse(localStorage.getItem("userpojo"));
    var flag = "not exist now";

    //Get current items or entries
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(25);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    console.log(indexOfFirstItem+" "+indexOfLastItem);
    const currentItems = Udata.slice(indexOfFirstItem, indexOfLastItem)

    //change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const headers = [
        { label: 'Id', key: 'id' },
        { label: 'EmployeeName', key: 'name' },
        { label: 'EmployeeSAPId', key: 'sapid' },
        { label: 'ProjectHours', key: 'projecthours' },
        { label: 'ProjectManagerName', key: 'projectmanagername' },
        { label: 'Holiday/LeaveHours', key: 'holidayleavehours' },
        { label: 'AfterNoonShiftDays', key: 'afternoonshiftdays' },
        { label: 'NightShiftDays', key: 'nightshiftdays' },
        { label: 'DaysEligibleForTA', key: 'dayseligibleforta' },
        { label: 'TransportAllowance', key: 'transportallowance' },
        { label: 'TotalAllowance', key: 'totalallowance' },
        { label: 'ApprovalStatus', key: 'status' },
        { label: 'PeriodStart', key: 'startdate' },
        { label: 'PeriodEnd', key: 'enddate' },
        { label: 'ProjectName', key: 'projectname' },
        { label: 'ProjectManagerName', key: 'projectmanagername' }
    ]
    //const [userpojo,setUserpojo]=useState();


    useEffect(() => {
        fetch(`http://localhost:8080/getAllowanceDashBoardADB`)
            .then(response => response.json())
            .then(data => {
                console.log("Entered Use Effect")
                console.log(data)
                setUData(data)
                setSearchApiData(data)
            });
    }, [])
    

    const PageSize = 20;
    const currentTableData = useMemo(() => {
        console.log("Entered Use Memo")
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        console.log(firstPageIndex+" "+lastPageIndex);
        return Udata.slice(firstPageIndex, lastPageIndex);
      }, [currentPage]);
      console.log(currentTableData);


    useEffect(() => {
        console.log("Test1");
        if (projectname !== ' ' && startdate !== ' ' && enddate !== ' ' && approvalstatus !== ' ') {
            var pmn2 = JSON.parse(localStorage.getItem("userpojo"));
            var modpmn2 = pmn2.replaceAll(' ', '_');
            var url = `http://localhost:8080/getAllowanceDashBoardByPnSdEdAs/${projectname}/${startdate}/${enddate}/${approvalstatus}/${modpmn2}`;
            fetch(url).then(response => response.json()).then(data => {
                console.log(data)
                setUData(data)

            });

        }

    }, [approvalstatus]);
    //    console.log(userpojo);
    //    console.log(projectmanagername);
    const csvreport = {
        filename: 'AllowanceReport.csv',
        headers: headers,
        data: Udata
    };

    //search
    const handleFilter = (e) => {
        if (e.target.value == '') {
            setUData(searchApiData);
        }
        else {
            const filterResult = searchApiData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filterResult.length > 0) {
                setUData(filterResult);
            }
            else {
                setUData([{ "name": "No Data" }])
            }
        }

        setFilterVal(e.target.value);

    }

    

    //sort by name
    const [sorted, setSorted] = useState({ sorted: "name", reversed: false });
    const sortByName = () => {
        setSorted({ sorted: "name", reversed: !sorted.reversed });
        const dataCopy = [...Udata];
        dataCopy.sort((a, b) => {
            const A = a.name;
            const B = b.name;

            if (sorted.reversed) {
                return A.localeCompare(B);
            }
            return B.localeCompare(A);

        });
        setUData(dataCopy);
    };

    //sort by SAPID
    const sortBySAPID = () => {
        setSorted({ sorted: "sapid", reversed: !sorted.reversed });
        const dataCopy = [...Udata];
        dataCopy.sort((a, b) => {
            const A = a.name;
            const B = b.name;
            if (sorted.reversed) {
                return A.localeCompare(B);
            }
            return B.localeCompare(A);
        });
        setUData(dataCopy);
    };
    const renderArrow = () => {

        if (sorted.reversed) {
    
          return <FaArrowUp />;
    
        }
    
        return <FaArrowDown/>;
    
      };
    return (<div style={{ "position": "absolute", "top": "0", "bottom": "0", "left": "0", "right": "0", "overflow-y": "scroll" }}>

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
                                    <LinkContainer to={`/profile/${pmn}`} >
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
        {/* <!----- Nav bar end -----> */}

        <br />
        <br />
        <br />

        <div class="container text-center border border-dark" style={{ "background-color": "orange" }}>
            <h1>Super Allowance Dashboard</h1>
        </div>
        <br />


        <div class="d-flex justify-content-evenly">
            <div class="col" style={{ "padding-left": "70px" }}>
                <select class="form-select" aria-label="Default select example" style={{ "width": "240px" }} onChange={(e) => { setProjectName(e.target.value) }}>
                    <option selected>Project</option>
                    <option value="Digital">Digital</option>
                    <option value="Enterprise Platforms">Enterprise Platforms</option>
                    <option value="CET">CET</option>
                    <option value="Data">Data</option>
                </select>
            </div>
            <div class="col">
                <label>From</label>&emsp;
                <input type="date" style={{ "height": "36px" }} onChange={(e) => { setStartdata(e.target.value) }} />
            </div>
            <div class="col">
                <label>To</label>&emsp;
                <input type="date" style={{ "height": "36px" }} onChange={(e) => { setEnddate(e.target.value) }} />
            </div>
            <div class="col">
                <label>Data</label>&emsp;
                <select style={{ "height": "36px" }} defaultValue={"All"} onChange={(e) => { setApprovalstatus(e.target.value) }}>
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="UnApproved">Unapproved</option>
                </select>
            </div>
        </div>
        <br />
        <div class="container-fluid">
            <div className="search-container" style={{ "padding-left": "70px" }}>
                <input type="text" placeholder="Search by Name" value={filterVal} onInput={(e) => handleFilter(e)} style={{ "width": "150px" }} />
            </div>

        </div>
        <div className="container">

            <Row>
                <Card className="mt-2">
                    <Card.Body>
                        <table class="table table-striped">
                            <thead className="table-info">
                                <tr>
                                    <th>ID</th>
                                    <th onClick={sortByName}>Name{sorted.sorted === "name" ? renderArrow() : null}</th>
                                    <th onClick={sortBySAPID}>SAP ID{sorted.sorted === "sapid" ? renderArrow() : null}</th>
                                    <th>Project hours</th>
                                    <th>ProjectManagerName</th>
                                    <th>Holiday / leaves hours</th>
                                    <th>Afternoon Shift Days</th>
                                    <th>Night Shift Days</th>
                                    <th>Days eligible for TA</th>
                                    <th>Transport Allowance</th>
                                    <th>Approval Status</th>
                                    <th>Total Allowance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(currentTableData)}
                                {currentTableData.map(c => <tr>
                                    {/* <td><input type="checkbox" /></td> */}
                                    <React.Fragment key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.sapid}</td>
                                        <td>{c.projecthours}</td>
                                        <td>{c.projectmanagername}</td>
                                        <td>{c.holidayleavehours}</td>
                                        <td>{c.afternoonshiftdays}</td>
                                        <td>{c.nightshiftdays}</td>
                                        <td>{c.dayseligibleforta}</td>
                                        <td>{c.transportallowance}</td>
                                        <td>{c.status}</td>
                                        <td>{c.totalallowance}</td>
                                        <td><button style={{ backgroundColor: "yellow" }}><a href={`/ProfileEdit/${c.id}`} style={{ color: "black" }}>Edit</a></button></td>
                                    </React.Fragment>
                                </tr>)}
                                <tr>
                                </tr>
                            </tbody>
                        </table>
                        {/* <Pagination itemsPerPage={itemsPerPage} totalItems={Udata.length} paginate={paginate} /> */}
                        {console.log(Udata.length)} 
                         <Pagination2 className="pagination-bar" currentPage={currentPage} totalCount={Udata.length} pageSize={PageSize} onPageChange={page => setCurrentPage(page)}/>
                    </Card.Body>
                </Card></Row>
            <div class="d-flex justify-content-between" style={{ "padding-left": "10px" }}>
                {/* <div>
                    <label>Sort by</label>&ensp;
                    <input />
                </div> */}
                <div style={{ "padding-left": "760px" }}>
                    {/* <button type="button" class="btn btn-success">Approve</button>&ensp;
                        <button type="button" class="btn btn-info"><i class="fa fa-download" aria-hidden="true"></i></button><br/>*/}<br />
                    <button class="btn btn-success" style={{ "width": "140px" }}><CSVLink {...csvreport} style={{ "text-decoration": "none", "color": "white" }}>Export to csv <i class="fa fa-download" aria-hidden="true"></i></CSVLink></button>
                </div>
                <br />
            </div>
        </div>
        <br />

        {/* <!----- Footer start -----> */}
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
        {/* <!----- Footer end -----> */}
    </div>

    )
};
export default SuperDashBoard;