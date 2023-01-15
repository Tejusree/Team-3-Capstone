import { BrowserRouter as Router, Navigate, Route } from 'react-router-dom';
import {Routes, Link} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AllowanceDashboard from './pages/AllowanceDashboard';
import SuperUserDashboard from './pages/SuperDashBoard';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
//import Unauthorized from './pages/Unauthorized';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import RequestAccess from './pages/RequestAccess';
import { Outlet } from 'react-router-dom';
import AuthComp from './pages/Authcomp';
import ProfileEdit from './pages/ProfileEdit';
import ProfileEdit2 from './pages/ProfileEdit2';
import FileUpload from './pages/FileUpload';
import './pages/Unauthorized.scss';

function App () {

  const [isAdmin, setisAdmin] = useState(false);
  const [isLead, setisLead] = useState(false);
  const [isDeveloper, setisDeveloper] = useState(false);
  //const [isEmployee, setisEmployee] = useState(false);
  const [isSuperUser, setisSuperUser] = useState(false);

  return (
    <>
    <AuthComp.Provider value={{isAdmin, setisAdmin, isLead, setisLead, isDeveloper, setisDeveloper, isSuperUser, setisSuperUser }}>
      <Router>
        <Routes>
        <Route path='/' exact element = {<Homepage/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/requestaccess' element = {<RequestAccess/>} />
        <Route path='/forgotpassword' element = {<ForgotPassword/>} />
        <Route path='/resetpassword' element = {<ResetPassword/>} />
        <Route path='/profile/:username' exact element = {<Profile/>} />
        <Route path ='/logout' element = {<Homepage/>} />
        <Route path='/ProfileEdit/:Id' element={<ProfileEdit/>}></Route>
        <Route path='/ProfileEdit2/:Id' element={<ProfileEdit2/>}></Route>

        <Route element={<PrivateRoutes1 />}> 
        <Route path='/admin' element = {<AdminDashboard/>} />
        </Route>

        <Route element={<PrivateRoutes2 />}>
        <Route path='/lead' element = {<AllowanceDashboard/>} />
        </Route>
        
        <Route element={<PrivateRoutes3 />}>
        <Route path='/developer' element = {<DeveloperDashboard/>} />
        </Route>
        
        
        <Route path='/employee' element = {<EmployeeDashboard/>} />
    

        <Route element={<PrivateRoutes5 />}>
        <Route path='/superuser' element = {<SuperUserDashboard/>} />
        </Route>

        <Route path='/unauthorized' element = {<Unauthorized/>} />

        <Route path='/fileupload' element = {<FileUpload/>} />

        </Routes>
        </Router>
        </AuthComp.Provider>
    </>
  );
};

const PrivateRoutes1 = () => {
    
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  if(role === "Admin")
  {
    var isAdmin = true;
  }
  // var temp = React.useContext(AuthComp);
  // console.log("admin " + temp.isAdmin);

  return(
    isAdmin ? <Outlet/> : <Navigate to='/unauthorized'/>
   )
 
}

const PrivateRoutes2 = () => {
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  if(role === "Lead")
  {
    var isLead = true;
  }
  // var temp = React.useContext(AuthComp);
  // console.log("lead " + temp.isLead);

  return(
    isLead ? <Outlet/> : <Navigate to='/unauthorized'/>
   )

}

const PrivateRoutes3 = () => {
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  if(role === "Developer")
  {
    var isDeveloper = true;
  }
  // var temp = React.useContext(AuthComp);
  // console.log("developer " + temp.isDeveloper);

  return(
    isDeveloper ? <Outlet/> : <Navigate to='/unauthorized' />
   )

}

// const PrivateRoutes4 = () => {
//   var pmn = JSON.parse(localStorage.getItem("userpojo"));
//   var role = JSON.parse(localStorage.getItem("userpojorole"));
//   if(role === "Employee")
//   {
//     var isEmployee = true;
//   }
//   var temp = React.useContext(AuthComp);
//   console.log("employee " + temp.isEmployee);

//   return(
//     isEmployee ? <Outlet/> : <Navigate to='/unauthorized'/>
//    )

// }

const PrivateRoutes5 = () => {
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  if(role === "SuperUser")
  {
    var isSuperUser = true;
  }
  // var temp = React.useContext(AuthComp);
  // console.log("superuser " + temp.isSuperUser);

  return(
    isSuperUser ? <Outlet/> : <Navigate to='/unauthorized'/>
   )

}

const Unauthorized = () => {
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  return (
    <div className='container5'>
      <div class="gandalf">
        <div class="fireball"></div>
        <div class="skirt"></div>
        <div class="sleeves"></div>
        <div class="shoulders">
          <div class="hand left"></div>
          <div class="hand right"></div>
        </div>
        <div class="head">
          <div class="hair"></div>
          <div class="beard"></div>
        </div>
      </div>
      <div class="message5">
        <h1>403 - You Shall Not Pass</h1>
        <p>Uh oh, looks like you are unauthorized to view this page! <Link to={`/profile/${pmn}`}>Back to Profile</Link> </p>
      </div>
    </div>
  )
}
   
    
export default App;







