import React, { useEffect, useState } from "react";
import './register.css';
import { useParams } from "react-router-dom";
import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Profileedit = (props) => {

    const [newuserdata, setNewuserdata] = useState(' ')
    const [msg, setMsg] = useState(' ');
    const params = useParams();
    const [afternoonshiftdays, setAfternoonshiftdays] = useState(0);
    const [nightshiftdays, setNightshiftdays] = useState(0);
    const [updatedstatus,setUpdatedstatus] = useState(' ');
    const [validateafsd,setValidateafsd] = useState(' ');
    const [validatensd,setValidatensd] = useState(' ');
    const [afsdfocus,setAfsdfocus] = useState(' ');
    const [nsdfocus,setNsdfocus] = useState(' ');
    const[msgColor, setmsgColor] = useState(false);

    var id = params.Id;
    useEffect(() => {
        console.log('Entered useeffect method');
        var url = `http://localhost:8080/getAllowanceDashBoardById/${id}`
        fetch(url).then(response => response.json())
            .then(data => {
                console.log(data)
                setNewuserdata(data)
                setNightshiftdays(data.nightshiftdays);
                setAfternoonshiftdays(data.afternoonshiftdays);
                setUpdatedstatus(data.status);
                console.log(afternoonshiftdays);
                console.log(nightshiftdays);
                console.log(updatedstatus);
            });
    }, [])

    function handlesubmit(e) {
        e.preventDefault();
        var ansd = parseInt(afternoonshiftdays);
        console.log(ansd);
        var nsd = parseInt(nightshiftdays);
        console.log(nsd);
        var defta = parseInt(parseInt(afternoonshiftdays) + parseInt(nightshiftdays));
        var tpallowance = defta * 300;
        var toallowance = defta * 300 + 1000;
        var id = newuserdata.id.toString();
        var status = updatedstatus;
        var url = `http://localhost:8080/updateUserAllowanceDashBoard/${ansd}/${nsd}/${defta}/${tpallowance}/${toallowance}/${id}/${status}`;
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'Application/json' }
        }).then(data => {
                console.log(data)
                setMsg("Updated the User in Allowance DashBoard")
                setmsgColor(true);
            });
    }

    function validateafternoonshiftdays(e)
    {
        e.preventDefault();
        const patternforafsd =  /^[0-7]{1}$/;
        const display = patternforafsd.test(e.target.value);

        if(display)
        {
            setAfternoonshiftdays(e.target.value);
            setValidateafsd(true);
        }
        else
        {
           setValidateafsd(false);
        }

    }

    function validatenightshiftdays(e)
    {
        e.preventDefault();
        const patternfornsd = /^[0-7]{1}$/;
        const display = patternfornsd.test(e.target.value);
        if(display)
        {
            setNightshiftdays(e.target.value);
            setValidatensd(true);
        }
        else
        {
           setValidatensd(false);
        }

    }

    return (
        <div className="form-container">
            <form>
                <label>
                    PROJECT NAME:
                </label>
                <input type="text" value={newuserdata.projectname}></input>
                <label>
                    NAME:
                </label>
                <input type="text" value={newuserdata.name}></input>
                <label>
                    SAP ID:
                </label>
                <input type="text" value={newuserdata.sapid}></input>
                {/* <label>
                    PROJECT HOURS:
                </label>
                <input type="text" value={newuserdata.projecthours}></input> */}
                {/* <label>
                    HOLIDAY/LEAVE HOURS:
                </label>
                <input type="text" value={newuserdata.holidayleavehours}></input> */}
                <label>
                    AFTERNOON SHIFT DAYS:
                </label>
                <input type="text" defaultValue={newuserdata.afternoonshiftdays} onChange={(e) => { validateafternoonshiftdays(e) }} onFocus={(e)=>setAfsdfocus(true)} onBlur={(e)=>setAfsdfocus(false)}></input><br/>
                <p id="afsdnote" className={ !validateafsd && afsdfocus ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon = {faInfoCircle}/>Afternoon shift days should be less than 7 and greater than equal to 0<br/>
                </p>
                <label>
                    NIGHT SHIFT DAYS:
                </label>
                <input type="text" defaultValue={newuserdata.nightshiftdays} onChange={(e) => { validatenightshiftdays(e) }} onFocus={(e)=>setNsdfocus(true)} onBlur={(e)=>setNsdfocus(false)}></input><br/>
                <p id="nsdnote" className={ !validatensd && nsdfocus ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon = {faInfoCircle}/>Night shift days should be less than 7 and greater than equal to 0<br/>
                </p>
                {/* <label>
                    DAYS ELIGIBLE FOR TA:
                </label>
                <input type="text" value={newuserdata.dayseligibleforta}></input> */}
                {/* <label>
                    TRAVEL ALLOWANCE:
                </label>
                <input type="text" value={newuserdata.transportallowance}></input> */}
                <label>
                    APPROVAL STATUS:
                </label>
                {/* <input type="text" defaultValue={newuserdata.status}></input> */}
                <select id="status" name="new_user_status" onChange={(e)=>setUpdatedstatus(e.target.value)} style={{"height":"45px"}}>
                    <option defaultValue={newuserdata.status}>{newuserdata.status}</option>
                    <option value="Approved">Approved</option>
                </select>
                {console.log(updatedstatus)}
                {/* <label>
                    TOTAL ALLOWANCE:
                </label>
                <input type="text" defaultValue={newuserdata.totalallowance}></input> */}
                <button className="btn btn-success" type="submit" onClick={(e) => handlesubmit(e)}>Submit</button><br />
                <a href="/lead">Back to Allowance DashBoard</a><br/>
                 {msgColor ?  <div className="msgdisplayg">
                    {msg}
                    </div> : ' '
}
                
            </form>
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
    )
};
export default Profileedit;