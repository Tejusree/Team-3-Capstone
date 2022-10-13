import React, { useEffect, useState } from "react";
import './register.css';
import { useParams } from "react-router-dom";

const Profileedit = (props) => {

    const [newuserdata, setNewuserdata] = useState(' ')
    const [msg, setMsg] = useState(' ');
    const [msg2,setMsg2] = useState(' ');
    const [msg3,setMsg3] = useState(' ');
    const params = useParams();
    const [afternoonshiftdays, setAfternoonshiftdays] = useState(0);
    const [nightshiftdays, setNightshiftdays] = useState(0);
    const [updatedstatus,setUpdatedstatus] = useState(' ');
    const [msgColor, setmsgColor] = useState(false);

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
        if(parseInt(e.target.value)>= 0 && parseInt(e.target.value)<=7)
        {
            setAfternoonshiftdays(e.target.value);
            setMsg2(' ');
        }
        else
        {
           setMsg2("The Afternoon shiftdays should be greater than or Equal to zero and less than 7");
        }

    }
    function validatenightshiftdays(e)
    {
        e.preventDefault();
        if(parseInt(e.target.value)>= 0 && parseInt(e.target.value)<=7)
        {
            setNightshiftdays(e.target.value);
            setMsg3(' ');
        }
        else
        {
           setMsg3("The Night shiftdays should be greater than or Equal to zero and less than 7");
        }

    }

    return (
        <div className="form-container">
            <form>
                <label>
                    PROJECTNAME:
                </label>
                <input type="text" value={newuserdata.projectname}></input>
                <label>
                    Name:
                </label>
                <input type="text" value={newuserdata.name}></input>
                <label>
                    SAP Id:
                </label>
                <input type="text" value={newuserdata.sapid}></input>
                <label>
                    PROJECT HOURS:
                </label>
                <input type="text" value={newuserdata.projecthours}></input>
                <label>
                    HOLIDAY/LEAVE HOURS:
                </label>
                <input type="text" value={newuserdata.holidayleavehours}></input>
                <label>
                    AFTERNOONSHIFTDAYS:
                </label>
                <input type="text" defaultValue={newuserdata.afternoonshiftdays} onChange={(e) => { validateafternoonshiftdays(e) }}></input><br/>
                {msg2}
                <label>
                    NIGHTSHIFTDAYS:
                </label>
                <input type="text" defaultValue={newuserdata.nightshiftdays} onChange={(e) => { validatenightshiftdays(e) }}></input><br/>
                {msg3}
                <label>
                    DAYS ELIGIBLE FOR TA:
                </label>
                <input type="text" value={newuserdata.dayseligibleforta}></input>
                <label>
                    TRAVEL ALLOWANCE:
                </label>
                <input type="text" value={newuserdata.transportallowance}></input>
                <label>
                    APPROVAL STATUS:
                </label>
                {/* <input type="text" defaultValue={newuserdata.status}></input> */}
                <select id="status" name="new_user_status" onChange={(e)=>setUpdatedstatus(e.target.value)} style={{"height":"50px"}}>
                    <option defaultValue={newuserdata.status}>{newuserdata.status}</option>
                    <option value="Approved">Approved</option>
                </select>
                {console.log(updatedstatus)}
                <label>
                    TOTAL ALLOWANCE:
                </label>
                <input type="text" defaultValue={newuserdata.totalallowance}></input>
                <button type="submit" onClick={(e) => handlesubmit(e)}>Submit</button><br />
                <a href="/lead">Back to Allowance DashBoard</a><br/>
                {
                    <span style={{"color": "green"}}>{msg}</span>
                }
            </form>
        </div>
    )
};
export default Profileedit;