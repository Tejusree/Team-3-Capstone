import React, {useEffect, useState,useRef} from "react";
import axios from "axios";
import './AdminDashboard.css';
import {Row,Col,Container,Card,Table,Alert} from "react-bootstrap";
import DeleteConfirmation from "./DeleteConfirmation";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowUp, FaArrowDown} from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
//import './All.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

function deleterequested(username)
{
  console.log("Entered delete request function");
  console.log(username);
  var url = `http://localhost:8080/delete/${username}`;
  fetch(url,{
    method:'DELETE',
    headers:{'Content-Type':'Application/json'}
  }
  )}

async function updaterequested(itemusername,itemrole,itemstatus)
{
      var erole = itemrole;
      var estatus = itemstatus;
      var url = `http://localhost:8080/updateByRoleStatus/${itemusername}/${erole}/${estatus}`;
      fetch(url,{
      method:'PUT',
      headers:{'Content-Type':'Application/json'}
        })
      alert('Changes have been made Successfully!');

      //send mail
      var formBodyData=new FormData();
          formBodyData.append('msgBody', "Dear Incedoer,\n\nYour request to enroll as a new user of our shift allowance app has been updated to : " + estatus + "\n\nKindly login to view your profile page.\nhttp://localhost:3000/login \n \nRegards,\nTeam Admin\nShift-Allowance App | http://localhost:3000");
          formBodyData.append('subject', "Shift Allowance app - Request Updated");
          formBodyData.append('recipient', itemusername);

       const res2= await axios({
            method:"POST",
            url:"http://localhost:8080/mailWithOtp",
            data:formBodyData,
            headers:{"Content-Type":"multipart/form-data"}
        })

    }

const AdminDashboard = () => {  

  const [filterVal, setFilterVal] = useState('');
  const [searchApiData, setSearchApiData] = useState([]);
  const [fruits, setFruits] = useState(null);

  //delete confirmation
  const [username, setUsername] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [fruitMessage, setFruitMessage] = useState(null);

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (username) => {
    setUsername(username);
    setFruitMessage(null);
    setDeleteMessage(`Are you sure you want to delete the request from '${data.find((x) => x.username === username).name}'?`);
    setDisplayConfirmationModal(true);
  };

// Hide the modal
const hideConfirmationModal = () => {
  setDisplayConfirmationModal(false);
};

// Handle the actual deletion of the item
const submitDelete = (username) => {
       
  deleterequested(username);
  setFruitMessage(`The request from '${data.find((x) => x.username === username).name}' was deleted successfully.`);
  setFruits(data.filter((data) => data.username !== username));
  setDisplayConfirmationModal(false);
};

 //fetching data from user_Register_details on page-rendering
  const [data, setdata] = useState(null);
  const pmn = JSON.parse(localStorage.getItem("userpojo"));
  useEffect(() => {
  fetch(`http://localhost:8080/getdata`)
  .then (response => response.json())
  .then(data => {console.log (data)
      setdata(data)
      setSearchApiData(data)});
    },[])

//sort columns by name and role
const[order, setorder] = useState("ASC");
const sorting = (col) => {
  if  (order ==="ASC"){
    const sorted = [...data].sort((a,b)=>
    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
    );
    setdata(sorted);
    setorder("DSC");
  }

  if  (order ==="DSC"){
    const sorted = [...data].sort((a,b)=>
    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
    );
    setdata(sorted);
    setorder("ASC");
  }
};


//sort by id
const [sorted, setSorted] = useState({sorted: "id", reversed: false});

const sortById = () => {
  setSorted({ sorted: "id", reversed: !sorted.reversed});
  const dataCopy = [...data];
  dataCopy.sort((a,b) => {
    if (sorted.reversed){
      return a.id-b.id;
    }
    return b.id-a.id;
  });
  setdata(dataCopy);
};


//sort by name
const sortByName = () => {
  setSorted({ sorted : "name", reversed: !sorted.reversed});
  const dataCopy = [...data];
  dataCopy.sort((a,b) => {
    const A = a.name;
    const B = b.name;
  
    if(sorted.reversed){
  return A.localeCompare(B);
    }
    return B.localeCompare(A);
  });
  setdata(dataCopy);
}; 


    
//sort by role
const sortByRole = () => {
  setSorted({ sorted : "role", reversed: !sorted.reversed});
  const dataCopy = [...data];
  dataCopy.sort((a,b) => {
    const A = a.role;
    const B = b.role;
  
    if(sorted.reversed){
  return A.localeCompare(B);
    }
    return B.localeCompare(A);
  });
  setdata(dataCopy);
}; 




//sort by status
const sortByStatus = () => {
  setSorted({ sorted : "status", reversed: !sorted.reversed});
  const dataCopy = [...data];
  dataCopy.sort((a,b) => {
    const A = a.status;
    const B = b.status;
  
    if(sorted.reversed){
  return A.localeCompare(B);
    }
    return B.localeCompare(A);
  });
  setdata(dataCopy);
}; 

    const renderArrow = () => {
      if (sorted.reversed) {
        return <FaArrowUp />;
      }
      return <FaArrowDown/>;
    };

//search
    const handleFilter=(e) => {
      if(e.target.value == ''){
        setdata(searchApiData);
      } else {
        const filterResult = searchApiData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if(filterResult.length >0){
        setdata(filterResult);
        } else {
          setdata([{"name" : "No Data"}])
        }
      }
      setFilterVal(e.target.value);
    }
    

    return (
    <div style={{ "position": "absolute", "top": "0", "bottom": "0", "left": "0", "right": "0", "overflow-y": "scroll" }}>
      <div>
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
             {/*<h1 style={{display:inline}}>Admin Dashboard</h1>*/} 
            <a className="navbar-brand" href="#"><span className="orange">incedo</span></a>
            <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><span className="orange">incedo</span></h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
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
      <br />
      <br />
      <br />
      <div>
        <div class="container text-center border border-dark" style={{"background-color":"orange"}}>
          <h1>Admin DashBoard</h1>
        </div>
        <br/>
        <div className="container">
        
          <div className="search-container">
          <input type = "text" placeholder="Search by Name" value={filterVal} onInput={(e) => handleFilter(e)}/>
          </div>
          <br/>
          {fruitMessage && <Alert variant="success">{fruitMessage}</Alert>}
          <table className="table table-striped" >
            <thead className="table-warning">
              <tr>
                <th className="text-center" onClick={sortById} scope='col'>User ID {sorted.sorted === "id" ? renderArrow() : null}</th>
                <th className="text-center" onClick={sortByName} scope='col'>Name {sorted.sorted === "name" ? renderArrow() : null}</th>
                <th className="text-center" scope='col'>Active From</th>
                <th className="text-center" onClick={sortByRole} scope='col'>Role{sorted.sorted === "role" ? renderArrow() : null}</th>
                <th className="text-center" onClick={sortByStatus} scope='col'>Status{sorted.sorted === "status" ? renderArrow() : null}</th>
                <th className="text-center" scope='col' colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody className="tbody-light">
              {data && (data.map(item =>
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.activefrom}</td>
                <td className="text-center"><select onChange={(e)=>{item.role=e.target.value}}>
                <option value="default">{item.role}</option>
                <option value="Admin" >Admin</option>
                <option value="Lead">Lead</option>
                <option value="Developer">Developer</option>
                <option value="Employee">Employee</option>
                <option value="SuperUser">SuperUser</option>
                </select></td>
                <td className="text-center"><select onChange={(e)=>{item.status=e.target.value}}>
                  <option value="default">{item.status}</option>
                  <option value="Requested">Requested</option>
                  <option value="Active" >Active</option>
                  <option value="Inactive">Inactive</option>
                  </select></td>
                  {console.log(item.username)}
                  {console.log(item.role)}
                  {/* {console.log(this.role.current.value)}
                  {console.log(this.status.current.value)} */}
                <td className="text-center"><button  className="btn btn-success" onClick={()=>updaterequested(item.username,item.role,item.status)}>Accept</button></td>
                <td className="text-center"><button  className="btn btn-danger" onClick={()=>showDeleteModal(item.username)}>Deny</button></td>
              </tr>
              ))}
            </tbody>
          </table>
          
          <DeleteConfirmation showModal={displayConfirmationModal} confirmModal = {submitDelete} hideModal = {hideConfirmationModal} username={username} message={deleteMessage} />
        </div>
        <br/>
        <div className="text-center">
          <div>
            <a href="/requestaccess" className="btn btn-primary">Add</a>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      {/* <!----- Footer start -----> */}
      <footer class="text-center text-lg-start bg-dark text-white fixed-bottom">
        <div class="text-center p-2">
          &copy; Copyright 2022 Incedo Inc.
        </div>
      </footer>
            {/* <!----- Footer end -----> */}
    </div>
    )};
export default AdminDashboard;