import { BrowserRouter as Router, Navigate, Route } from 'react-router-dom';
import {Routes} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AllowanceDashboard from './pages/AllowanceDashboard';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import RequestAccess from './pages/RequestAccess';
import { Outlet } from 'react-router-dom';
import AuthComp from './pages/Authcomp';
import ProfileEdit from './pages/ProfileEdit';

function App () {

  const [isAdmin, setisAdmin] = useState(false);
  const [isLead, setisLead] = useState(false);
  const [isDeveloper, setisDeveloper] = useState(false);
  const [isEmployee, setisEmployee] = useState(false);

  return (
    <>
    <AuthComp.Provider value={{isAdmin, setisAdmin, isLead, setisLead, isDeveloper, setisDeveloper, isEmployee, setisEmployee  }}>
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

        <Route element={<PrivateRoutes1 />}> 
        <Route path='/admin' element = {<AdminDashboard/>} />
        </Route>

        <Route element={<PrivateRoutes2 />}>
        <Route path='/lead' element = {<AllowanceDashboard/>} />
        </Route>
        
        <Route element={<PrivateRoutes3 />}>
        <Route path='/developer' element = {<DeveloperDashboard/>} />
        </Route>
        
        <Route element={<PrivateRoutes4 />}>
        <Route path='/employee' element = {<EmployeeDashboard/>} />
        </Route>

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
  var temp = React.useContext(AuthComp);
  console.log("admin " + temp.isAdmin);

  return(
    isAdmin ? <Outlet/> : <Navigate to={`/profile/${pmn}`}/>
   )
 
}

const PrivateRoutes2 = () => {
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  if(role === "Lead")
  {
    var isLead = true;
  }
  var temp = React.useContext(AuthComp);
  console.log("lead " + temp.isLead);

  return(
    isLead ? <Outlet/> : <Navigate to={`/profile/${pmn}`}/>
   )

}

const PrivateRoutes3 = () => {
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  if(role === "Developer")
  {
    var isDeveloper = true;
  }
  var temp = React.useContext(AuthComp);
  console.log("developer " + temp.isDeveloper);

  return(
    isDeveloper ? <Outlet/> : <Navigate to={`/profile/${pmn}`}/>
   )

}

const PrivateRoutes4 = () => {
  var pmn = JSON.parse(localStorage.getItem("userpojo"));
  var role = JSON.parse(localStorage.getItem("userpojorole"));
  if(role === "Employee")
  {
    var isEmployee = true;
  }
  var temp = React.useContext(AuthComp);
  console.log("employee " + temp.isEmployee);

  return(
    isEmployee ? <Outlet/> : <Navigate to={`/profile/${pmn}`}/>
   )

}
   
    
export default App;







