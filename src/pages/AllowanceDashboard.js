import React, { useState } from "react";
import { useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Row, Card } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import './All.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import Pagination from "./Pagination";
import { FaArrowUp, FaArrowDown} from "react-icons/fa";
import './dashboard.css';

const AllowanceDashboard = () => {

    const [filterVal, setFilterVal] = useState('');
    const [searchApiData, setSearchApiData] = useState([]);

    const [Udata, setUData] = useState([]);
    const [projectname, setProjectName] = useState(' ');
    const [startdate, setStartdata] = useState(' ');
    const [enddate, setEnddate] = useState(' ');
    const [approvalstatus, setApprovalstatus] = useState(' ');
    const pmn = JSON.parse(localStorage.getItem("userpojo"));
    var flag = "not exist now";

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(25);


    //Get current items or entries
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
        var pmn = JSON.parse(localStorage.getItem("userpojo"));
        fetch(`http://localhost:8080/getAllowanceDashBoardADB/${pmn}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUData(data)
                setSearchApiData(data)
            });
    }, [])
    //   if(userpojo != undefined)
    //   {
    //      var projectmanagername = userpojo.name;
    //   }
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

    //sort using name and sapid
    const [order, setOrder] = useState("ASC");
    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...Udata].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUData(sorted);
            setOrder("DSC");
        }
        if (order == "DSC") {
            const sorted = [...Udata].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUData(sorted);
            setOrder("ASC");
        }
    };


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

        <div class="container text-center border border-dark" style={{ "background-color": "orange" }}>
            <h1>Allowance Dashboard</h1>
        </div>
        <br />


        <div id="main" class="d-flex justify-content-evenly">
            <div class="col project">
                <select aria-label="Default select example" style={{ "height":"36px" }} onChange={(e) => { setProjectName(e.target.value) }}>
                    <option selected>Project</option>
                    <option value="Digital">Digital</option>
                    <option value="Enterprise Platforms">Enterprise Platforms</option>
                    <option value="CET">CET</option>
                    <option value="Data">Data</option>
                </select>
            </div>
            <div class="col">
                <label>From</label>&ensp;
                <input type="date" style={{ "height": "36px" }} onChange={(e) => { setStartdata(e.target.value) }} />
            </div>
            <div class="col">
                <label>To</label>&ensp;
                <input type="date" style={{ "height": "36px" }} onChange={(e) => { setEnddate(e.target.value) }} />
            </div>
            <div class="col">
                <label>Data</label>&ensp;
                <select style={{ "height": "36px" }} defaultValue={"All"} onChange={(e) => { setApprovalstatus(e.target.value) }}>
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="UnApproved">Unapproved</option>
                </select>
            </div>
        </div>
        <br />
        <div class="container-fluid">
            <div className="search-container searchstyle">
                <input type="text" placeholder="Search by Name" value={filterVal} onInput={(e) => handleFilter(e)} style={{ "width": "150px" }} />
            </div>

        </div>
        <br/>
        <div className="container">

           
                        <table class="table table-striped table-responsive">
                            <thead className="table-info">
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center" onClick={sortByName}>Name {sorted.sorted === "name" ? renderArrow() : null}</th>
                                    <th className="text-center" onClick={sortBySAPID}>SAP ID {sorted.sorted === "sapid" ? renderArrow() : null}</th>
                                    <th className="text-center">Project hours</th>
                                    <th className="text-center">Project Manager Name</th>
                                    <th className="text-center">Holiday / leaves hours</th>
                                    <th className="text-center">Afternoon Shift Days</th>
                                    <th className="text-center">Night Shift Days</th>
                                    <th className="text-center">Days eligible for TA</th>
                                    <th className="text-center">Transport Allowance</th>
                                    <th className="text-center">Approval Status</th>
                                    <th className="text-center">Total Allowance</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(c => <tr>
                                    {/* <td><input type="checkbox" /></td> */}
                                    <React.Fragment key={c.id}>
                                        <td className="text-center">{c.id}</td>
                                        <td className="text-center">{c.name}</td>
                                        <td className="text-center">{c.sapid}</td>
                                        <td className="text-center">{c.projecthours}</td>
                                        <td className="text-center">{c.projectmanagername}</td>
                                        <td className="text-center">{c.holidayleavehours}</td>
                                        <td className="text-center">{c.afternoonshiftdays}</td>
                                        <td className="text-center">{c.nightshiftdays}</td>
                                        <td className="text-center">{c.dayseligibleforta}</td>
                                        <td className="text-center">{c.transportallowance}</td>
                                        <td className="text-center">{c.status}</td>
                                        <td className="text-center">{c.totalallowance}</td>
                                        <td className="text-center"><button style={{ backgroundColor: "yellow" }}><a href={`/ProfileEdit/${c.id}`} style={{ color: "black" }}><RiIcons.RiEdit2Fill/></a></button></td>
                                    </React.Fragment>
                                </tr>)}
                                <tr>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={Udata.length} paginate={paginate} />
                    
            <div class="d-flex justify-content-between" style={{ "padding-left": "1.5cm", "font-weight": "bold" }}>
                <br />
                    {/* <button type="button" class="btn btn-success">Approve</button>&ensp;
                        <button type="button" class="btn btn-info"><i class="fa fa-download" aria-hidden="true"></i></button><br/>*/}<br />
                    <button class="btn btn-success" style={{ "width": "140px" }}><CSVLink {...csvreport} style={{ "text-decoration": "none", "color": "white" }}>Export to csv <i class="fa fa-download" aria-hidden="true"></i></CSVLink></button>
                
                <br />
            </div>
        </div><br/>
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

    )
};
export default AllowanceDashboard;

{/* // import React from 'react';
// function User () {
//   return (
//     <div className='user'>
//         <h1>user</h1>
//         </div>
//   );
// }
// export default User; */}