import { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AllocateProjects from "./AllocateProjects";

function TimeSheetParent(){
    function TimeSheet(range) {
        var [Timesheetdata, setTimesheetdata] = useState({});
        var [Assignedprojects,SetAssignedprojects] = useState([]);
        const [ID, setID] = useState(0);
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/getTimesheetData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify({ startPeriod: range.startPeriod, endPeriod: range.endPeriod }),
                    });
    
                    const data = await response.json();
                    console.log(data);
                    setTimesheetdata(data.payload)
                } catch (error) {
                    console.error('Error fetching timesheet data:', error);
                }
            };
    
            const fetchUserProject = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/getUserProject', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                        }
                    });
    
                    const data = await response.json();
                    console.log(data);
                    SetAssignedprojects(data.payload)
                } catch (error) {
                    console.error('Error fetching timesheet data:', error);
                }
            };
    
            fetchUserProject();
            fetchData();
        }, []);
    
    
        const [TotalHours, SetTotalHours] = useState(0);
        const firstID = Object.keys(Timesheetdata)[0];
    
        const handleSubmit = async (e) => {
            console.log(Timesheetdata);
            try {
                const response = await fetch('http://localhost:3000/api/CreateUpdateTimesheets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                    },
                    body: JSON.stringify(Timesheetdata),
                });

                // const data = await response.json();
                // console.log(data);
                // setTimesheetdata(data.payload)
            } catch (error) {
                console.error('Error fetching timesheet data:', error);
            }
        }
    
        function TimeSheetLoop(setID) {
            const [seed, setSeed] = useState(0);
            var totalMon = 0;
            var totalTue = 0;
            var totalWed = 0;
            var totalThur = 0;
            var totalFri = 0;
            var totalSat = 0;
            var totalSun = 0;
    
            for (const key in Timesheetdata) {
                totalMon += Number(Timesheetdata[key]['mon']);
                totalTue += Number(Timesheetdata[key]['tue']);
                totalWed += Number(Timesheetdata[key]['wed']);
                totalThur += Number(Timesheetdata[key]['thur']);
                totalFri += Number(Timesheetdata[key]['fri']);
                totalSat += Number(Timesheetdata[key]['sat']);
                totalSun += Number(Timesheetdata[key]['sun']);
            };
            let GrandTotal = totalMon + totalTue + totalWed + totalThur + totalFri + totalSat + totalSun;
            SetTotalHours(GrandTotal);
            return (
                <>
                    {Object.entries(Timesheetdata).map((t, k) => <Showtimesheet id={t[0]} data={t} seedSetter={setSeed}></Showtimesheet>)}
                    <tr>
                        <td>Total Hours</td>
                        <td></td>
                        <td></td>
                        {(() => {
                            if (totalMon > 8) {
                                return (
                                    <td><p style={{ color: 'red' }}>{totalMon}</p></td>
                                )
                            }
                            return <td><p>{totalMon}</p></td>
                        })()}
                        {(() => {
                            if (totalTue > 8) {
                                return (
                                    <td><p style={{ color: 'red' }}>{totalTue}</p></td>
                                )
                            }
                            return <td><p>{totalTue}</p></td>
                        })()}
                        {(() => {
                            if (totalWed > 8) {
                                return (
                                    <td><p style={{ color: 'red' }}>{totalWed}</p></td>
                                )
                            }
                            return <td><p>{totalWed}</p></td>
                        })()}
                        {(() => {
                            if (totalThur > 8) {
                                return (
                                    <td><p style={{ color: 'red' }}>{totalThur}</p></td>
                                )
                            }
                            return <td><p>{totalThur}</p></td>
                        })()}
                        {(() => {
                            if (totalFri > 8) {
                                return (
                                    <td><p style={{ color: 'red' }}>{totalFri}</p></td>
                                )
                            }
                            return <td><p>{totalFri}</p></td>
                        })()}
                        {(() => {
                            if (totalSat > 8) {
                                return (
                                    <td><p style={{ color: 'red' }}>{totalSat}</p></td>
                                )
                            }
                            return <td><p>{totalSat}</p></td>
                        })()}
                        {(() => {
                            if (totalSun > 8) {
                                return (
                                    <td><p style={{ color: 'red' }}>{totalSun}</p></td>
                                )
                            }
                            return <td><p>{totalSun}</p></td>
                        })()}
                        <td>{GrandTotal}</td>
                    </tr>
                </>
            )
        };
    
        function Showtimesheet({ id, data, seedSetter }) {

            console.log("data->",data)
        
            const ChangeMon = (e) => {
                e.preventDefault()
                var currId = e.target.id
    
                var currVal = e.target.value
    
                Timesheetdata[currId]['mon'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeTue = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['tue'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeWed = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['wed'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeThur = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['thur'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeFri = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['fri'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeSat = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['sat'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeSun = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['sun'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeName = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['PID'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeComment = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['comment'] = currVal;
                seedSetter(Math.random())
            };
    
            const ChangeActivity = (e) => {
                e.preventDefault()
                var currId = e.target.id
                var currVal = e.target.value
                Timesheetdata[currId]['activity'] = currVal;
                seedSetter(Math.random())
            };
    
            const CreateNewEntry = (e) => {
                const characters = '0123456789';
                let randomString = '';
                for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomString += characters[randomIndex];
                }
                
                const ids = randomString;
                setID(ids);
                
                Timesheetdata[ids] = {
                    UID: ids,
                    email: sessionStorage.getItem("email"),
                    PID: "", // Assuming PID is empty initially
                    activity: "",
                    comments:"",
                    start_period: "2024-03-05T00:00:00.000+00:00", // Example start date
                    end_period: "2024-04-05T00:00:00.000+00:00", // Example end date
                    mon: 0,
                    tue: 0,
                    wed: 0,
                    thur: 0,
                    fri: 0,
                    sat: 0,
                    sun: 0,
                    created_at: new Date()
                };
                seedSetter(Math.random())
            }
    
            const DeleteEntry = (e) => {
                e.preventDefault()
                var currId = e.target.id
                delete Timesheetdata[currId];
                seedSetter(Math.random());
            }
    
            var total = Number(data[1].mon) + Number(data[1].tue) + Number(data[1].wed) + Number(data[1].thur) + Number(data[1].fri) + Number(data[1].sat) + Number(data[1].sun);
            return (
                <>
                    <tr>
                        <td>
                            <select value={data[1].activity} id={id} onChange={ChangeActivity}>
                            <option value="">Select Project Type</option>
                                <option value="client_project">Client Project</option>
                                <option value="sales_activity">Sales activity</option>
                                <option value="bau">BAU activity</option>
                            </select>
                        </td>
                        <td>
                            <select value={data[1].PID} id={id} onChange={ChangeName}>
                            <option value="">Select Project</option>
                                {
                                    Assignedprojects.map(Assignedproject => (
                                        <option value={Assignedproject.PID}>{Assignedproject.name}</option>
                                    ))
                                }
                            </select>
                        </td>
                        <td><textarea value={data[1].comment} id={id} onChange={ChangeComment} rows="2" cols="30" /></td>
                        <td><input type="text" value={data[1].mon} id={id} onChange={ChangeMon} /></td>
                        <td><input type="text" value={data[1].tue} id={id} onChange={ChangeTue} /></td>
                        <td><input type="text" value={data[1].wed} id={id} onChange={ChangeWed} /></td>
                        <td><input type="text" value={data[1].thur} id={id} onChange={ChangeThur} /></td>
                        <td><input type="text" value={data[1].fri} id={id} onChange={ChangeFri} /></td>
                        <td><input type="text" value={data[1].sat} id={id} onChange={ChangeSat} /></td>
                        <td><input type="text" value={data[1].sun} id={id} onChange={ChangeSun} /></td>
                        <td><p>{total}</p></td>
                        <td><button onClick={CreateNewEntry}>+</button></td>
                        {(() => {
                            if (id !== firstID) {
                                return (
                                    <td><button id={id} onClick={DeleteEntry}>-</button></td>
                                )
                            }
                            return null;
                        })()}
                    </tr>
    
                </>
            )
        }
    
        return (
    
            <div className='main'>
                <h1>TimeSheet</h1>
                <h3>Total Time: {TotalHours}</h3>
                <p className='subHeading'>Allocation Extension</p>
                <p className='subHeading2'>TimeSheet</p>
                <table>
                    <tr>
                        <th>Project Type</th>
                        <th>Project Name</th>
                        <th>Task Name</th>
                        <th>Mon 29</th>
                        <th>Tue 30</th>
                        <th>Wed 31</th>
                        <th>Thu 1</th>
                        <th>Fri 2</th>
                        <th>Sat 3</th>
                        <th>Sun 4</th>
                        <th>Total</th>
                        <th>   </th>
                        <th>   </th>
                    </tr>
                    <TimeSheetLoop setID={setID} />
                </table>
                <div >
                    <Button onClick={handleSubmit} label="Submit" />
                </div>
            </div>
        )
    };

    return (
        <>
        <TimeSheet startPeriod="2024-03-05T00:00:00.000+00:00" endPeriod="2024-04-05T00:00:00.000+00:00" ></TimeSheet>
        </>
    )
}


export default TimeSheetParent;