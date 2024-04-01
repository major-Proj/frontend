import { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useNavigate } from "react-router-dom";

function TimeSheetParent() {

    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-07'));
    const navigate = useNavigate();

    console.log("starte", startDate);
    console.log("ende", endDate);

    const handleNextWeek = () => {
        // Increment the start date by 7 days to get the start date of the next week
        const nextStartDate = new Date(startDate);
        nextStartDate.setDate(nextStartDate.getDate() + 7);
        setStartDate(nextStartDate.toISOString());

        const nextEndDate = new Date(endDate);
        nextEndDate.setDate(nextEndDate.getDate() + 7);
        setEndDate(nextEndDate.toISOString());
    };

    const handlePreviousWeek = () => {
        // Increment the start date by 7 days to get the start date of the next week
        const prevStartDate = new Date(startDate);
        prevStartDate.setDate(prevStartDate.getDate() - 7);
        setStartDate(prevStartDate.toISOString());

        const prevEndDate = new Date(endDate);
        prevEndDate.setDate(prevEndDate.getDate() - 7);
        setEndDate(prevEndDate.toISOString());
    };

    const getWeekDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push(date.toDateString()); // You can format the date as needed
        }
        return dates;
    };

    const weekdaysval = getWeekDates();
    console.log(weekdaysval)


    function TimeSheet(range) {
        var [Timesheetdata, setTimesheetdata] = useState({});
        var [Assignedprojects, SetAssignedprojects] = useState([]);
        const [TotalHours, SetTotalHours] = useState(0);
        const firstID = Object.keys(Timesheetdata)[0];

        const [ID, setID] = useState(0);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/getTimesheetData', {
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
                    const response = await fetch('http://localhost:5000/api/getUserProject', {
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




        const handleSave = async (e) => {
            console.log(Timesheetdata);
            try {
                const response = await fetch('http://localhost:5000/api/CreateUpdateTimesheets', {
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

        const handleSubmit = async (e) => {
            console.log(Timesheetdata);
            try {
                const response = await fetch('http://localhost:5000/api/CreateUpdateTimesheets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                    },
                    body: JSON.stringify(Timesheetdata),
                });

            } catch (error) {
                console.error('Error fetching timesheet data:', error);
            }

            const uniquePIDs = new Set();

            // Loop through the object entries and extract unique PID values
            for (const entryKey in Timesheetdata) {
                const entry = Timesheetdata[entryKey];
                if (entry && entry.PID) {
                    uniquePIDs.add(entry.PID);
                }
            }

            // Convert set to array if needed
            const uniquePIDsArray = Array.from(uniquePIDs);
            console.log("uniqueid->>", uniquePIDsArray);

            for (let i = 0; i < uniquePIDsArray.length; i++) {
                console.log(uniquePIDsArray[i]);
                try {
                    const response = fetch('http://localhost:5000/api/FeedbackHistory', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify({
                            PID: uniquePIDsArray[i],
                            start_period: startDate,
                            end_period: endDate,
                            feedback_given: false
                        }),
                    });
                
                
                } catch (error) {
                    console.error('Error fetching timesheet data:', error);
                }
            }
            navigate('/feedback')

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
                if (Timesheetdata[key]['visible']){
                totalMon += Number(Timesheetdata[key]['mon']);
                totalTue += Number(Timesheetdata[key]['tue']);
                totalWed += Number(Timesheetdata[key]['wed']);
                totalThur += Number(Timesheetdata[key]['thur']);
                totalFri += Number(Timesheetdata[key]['fri']);
                totalSat += Number(Timesheetdata[key]['sat']);
                totalSun += Number(Timesheetdata[key]['sun']);
                }
            };
            let GrandTotal = totalMon + totalTue + totalWed + totalThur + totalFri + totalSat + totalSun;
            SetTotalHours(GrandTotal);
            return (
                <>{Object.entries(Timesheetdata).map((t, k) => {
                    if (t[1].visible) {
                        return (
                            <Showtimesheet id={t[0]} data={t} seedSetter={setSeed} startPeriod={range.startPeriod} endPeriod={range.endPeriod}></Showtimesheet>
                        );
                    } else {
                        return null; // Render nothing if 'visible' is false
                    }
                })}

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

        function Showtimesheet({ id, data, seedSetter, startPeriod, endPeriod }) {

            console.log("data->", data)

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
                    PID: "",
                    activity: "",
                    comments: "",
                    start_period: startPeriod,
                    end_period: endPeriod,
                    mon: 0,
                    tue: 0,
                    wed: 0,
                    thur: 0,
                    fri: 0,
                    sat: 0,
                    sun: 0,
                    visible: true,
                    created_at: new Date()
                };
                seedSetter(Math.random())
            }

            const DeleteEntry = (e) => {
                e.preventDefault()
                var currId = e.target.id
                Timesheetdata[currId].visible = false;
                seedSetter(Math.random());
            }

            var total = Number(data[1].mon) + Number(data[1].tue) + Number(data[1].wed) + Number(data[1].thur) + Number(data[1].fri) + Number(data[1].sat) + Number(data[1].sun);
            return (
                <>
                    <tr className="border-b border-gray-200">
                        <td className="py-2">
                            <select value={data[1].activity} id={id} onChange={ChangeActivity} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <option value="">Select Project Type</option>
                                <option value="client_project">Client Project</option>
                                <option value="sales_activity">Sales activity</option>
                                <option value="bau">BAU activity</option>
                            </select>
                        </td>
                        <td className="py-2">
                            <select value={data[1].PID} id={id} onChange={ChangeName} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <option value="">Select Project</option>
                                {Assignedprojects.map(Assignedproject => (
                                    <option key={Assignedproject.PID} value={Assignedproject.PID}>{Assignedproject.name}</option>
                                ))}
                            </select>
                        </td>
                        <td className="py-2">
                            <textarea value={data[1].comment} id={id} onChange={ChangeComment} rows="2" cols="30" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
                        </td>
                        <td className="py-2"><input type="text" value={data[1].mon} id={id} onChange={ChangeMon} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" /></td>
                        <td className="py-2"><input type="text" value={data[1].tue} id={id} onChange={ChangeTue} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" /></td>
                        <td className="py-2"><input type="text" value={data[1].wed} id={id} onChange={ChangeWed} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" /></td>
                        <td className="py-2"><input type="text" value={data[1].thur} id={id} onChange={ChangeThur} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" /></td>
                        <td className="py-2"><input type="text" value={data[1].fri} id={id} onChange={ChangeFri} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" /></td>
                        <td className="py-2"><input type="text" value={data[1].sat} id={id} onChange={ChangeSat} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" /></td>
                        <td className="py-2"><input type="text" value={data[1].sun} id={id} onChange={ChangeSun} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" /></td>
                        <td className="py-2"><p>{total}</p></td>
                        <td className="py-2"><button onClick={CreateNewEntry} className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:bg-green-600">+</button></td>
                        {id !== firstID && <td className="py-2"><button id={id} onClick={DeleteEntry} className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:bg-red-600">-</button></td>}
                    </tr>
                </>
            );

        }

        return (
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Total Time: {TotalHours}</h3>

                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Project Type</th>
                            <th className="border px-4 py-2">Project Name</th>
                            <th className="border px-4 py-2">Task Name</th>
                            {[...Array(7)].map((_, index) => {
                                const day = new Date(range.startPeriod);
                                day.setDate(day.getDate() + index);
                                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                                return <th className="border px-4 py-2">{day.toLocaleDateString('en-US', options)}</th>;
                            })}
                            <th className="border px-4 py-2">Total</th>
                            <th className="border px-4 py-2"></th>
                            <th className="border px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <TimeSheetLoop setID={setID} />
                    </tbody>
                </table>
                <div className="mt-4">
                    <Button onClick={handleSave} label="save" className="mr-2" />
                    <Button onClick={handleSubmit} label="submit" />
                </div>
            </div>
        );

    };

    return (
        <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">TimeSheet</h1>
            <div className="flex justify-end items-center mb-4">
                <button onClick={handlePreviousWeek} className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 focus:outline-none">
                    {'<'}
                </button>
                <span className="mr-2">{weekdaysval[0]} - {weekdaysval[6]}</span>
                <button onClick={handleNextWeek} className="px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none">
                    {'>'}
                </button>
            </div>
            <TimeSheet startPeriod={startDate} endPeriod={endDate} />
        </div>
    );
}


export default TimeSheetParent;