import { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import TopNavbar from "./Navbar";
import { useLocation } from "react-router-dom";
let Questions = require('../data/feedbackQuestions.json')

function UserDashParentAdmin() {

    const location = useLocation();
    const [email, setEmail] = useState(sessionStorage.getItem('email'));


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const encodedEmail = searchParams.get('email');
        const Decodedemail = decodeURIComponent(encodedEmail);
        setEmail(Decodedemail);
    }, [location.search]);


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return (`${year}-${month}-${day}`);
    }

    const today = new Date();
    console.log("today", today.toDateString())
    const dayOfWeek = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 7));


    const formattedDateSunday = formatDate(sunday);
    const formattedDateMonday = formatDate(monday);

    const [startDate, setStartDate] = useState(formattedDateMonday);
    const [endDate, setEndDate] = useState(formattedDateSunday);

    const dateWithoutTime1 = new Date(new Date(endDate).getFullYear(), new Date(endDate).getMonth(), new Date(endDate).getDate());

    const dateWithoutTime2 = new Date(new Date(sunday).getFullYear(), new Date(sunday).getMonth(), new Date(sunday).getDate());


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

    
    function TimeSheet(range) {
        var [Timesheetdata, setTimesheetdata] = useState({});
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
                        body: JSON.stringify({ email: range.email, startPeriod: range.startPeriod, endPeriod: range.endPeriod }),
                    });

                    const data = await response.json();
                    console.log(data);
                    setTimesheetdata(data.payload)
                } catch (error) {
                    console.error('Error fetching timesheet data:', error);
                }
            };

            fetchData();
        }, []);

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
                if (Timesheetdata[key]['visible']) {
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

        function Showtimesheet({ id, data }) {


            var total = Number(data[1].mon) + Number(data[1].tue) + Number(data[1].wed) + Number(data[1].thur) + Number(data[1].fri) + Number(data[1].sat) + Number(data[1].sun);
            return (
                <>
                    <tr className="border-b border-gray-200">
                        <td className="py-2">
                            {data[1].activity}
                        </td>
                        <td className="py-2">
                            {data[1].PID}
                        </td>
                        <td className="py-2">
                            {data[1].comments}
                        </td>
                        <td className="py-2">{data[1].mon}</td>
                        <td className="py-2">{data[1].tue}</td>
                        <td className="py-2">{data[1].wed}</td>
                        <td className="py-2">{data[1].thur}</td>
                        <td className="py-2">{data[1].fri}</td>
                        <td className="py-2">{data[1].sat}</td>
                        <td className="py-2">{data[1].sun}</td>
                        <td className="py-2"><p>{total}</p></td>
                    </tr>
                </>
            );

        }

        let submitted;
        if (Object.values(Timesheetdata).length > 0){
            submitted = Object.values(Timesheetdata)[0].submitted;
        }   else {
            submitted = false;
        }
        
        return (

            <div className="p-4">
                {submitted ? (
                    <div>
                        <h3 className="text-xl font-bold mb-2">Total Time: {TotalHours}</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Project Type</th>
                                    <th className="border px-4 py-2">Project Name</th>
                                    <th className="border px-4 py-2">Comments</th>
                                    {[...Array(7)].map((_, index) => {
                                        const day = new Date(range.startPeriod);
                                        day.setDate(day.getDate() + index);
                                        const options = { weekday: 'short', month: 'short', day: 'numeric' };
                                        return <th className="border px-4 py-2">{day.toLocaleDateString('en-US', options)}</th>;
                                    })}
                                    <th className="border px-4 py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TimeSheetLoop setID={setID} />
                            </tbody>
                        </table>
                    </div>
                ) : (<div class="flex justify-center items-center h-screen">
                    <h2 class="text-6xl text-white">The user has not submitted for this date</h2>
                </div>
                )}

            </div>
        );

    };

    function FeedbacksSheet (range){

        const [FeedbackData,setFeedbackData] = useState([])

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/AllFeedbacks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify({ email: range.email, startPeriod: range.startPeriod, endPeriod: range.endPeriod }),
                    });

                    const data = await response.json();
                    setFeedbackData(data.payload);
                    console.log(data);

                } catch (error) {
                    console.error('Error fetching timesheet data:', error);
                }
            };

            fetchData();
        }, []);

        const FeedbackCard = ({ feedback }) => {
            return (
                <div className="bg-white bg-opacity-50 rounded-lg shadow-sm p-4 mb-4">
                    <h2 className="text-xl font-bold mb-4">Feedback</h2>
                    <div className="mb-2">
                        <strong>{Questions.common.q1}</strong> {feedback.q1}
                    </div>
                    <div className="mb-2">
                        <strong>{Questions.common.q2}</strong> {feedback.q2}
                    </div>
                    <div className="mb-2">
                        <strong>{Questions.common.q3}</strong> {feedback.q3}
                    </div>
                    <div className="mb-2">
                        <strong>{Questions.common.q4}</strong> {feedback.q4}
                    </div>
                    <div className="mb-2">
                        <strong>{Questions.common.q5}</strong> {feedback.q5}
                    </div>
                    <div className="mb-2">
                        <strong>{Questions[feedback.role].q6}</strong> {feedback.q6}
                    </div>
                    <div className="mb-2">
                        <strong>{Questions[feedback.role].q7}</strong> {feedback.q7}
                    </div>
                    <div className="mb-2">
                        <strong>{Questions[feedback.role].q8}</strong> {feedback.q8}
                    </div>
                    <div className="mb-2">
                        <strong>Comments:</strong> {feedback.comments}
                    </div>
                </div>
            );
        };
        
          
        return(
            <>
            {FeedbackData.map((feedback, index) => (
                <FeedbackCard key={index} feedback={feedback} />
            ))}
        </>
        )
    }
    
    return (
        <>
            <TopNavbar />
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 h-screen">
                <h1 className="text-3xl font-bold text-center mb-8 text-white">TimeSheet for {email}</h1>
                <div className="flex justify-end items-center mb-4">
                    <button onClick={handlePreviousWeek} className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 focus:outline-none">
                        {'<'}
                    </button>
                    <span className="mr-2">{weekdaysval[0]} - {weekdaysval[6]}</span>
                    <button onClick={handleNextWeek} disabled={dateWithoutTime1.toDateString() === dateWithoutTime2.toDateString()} className="px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none">
                        {'>'}
                    </button>
                </div>
                <TimeSheet startPeriod={startDate} endPeriod={endDate} email={email} />
                <FeedbacksSheet startPeriod={startDate} endPeriod={endDate} email={email}/>
            </div>
        </>
    );
}


export default UserDashParentAdmin;