import './home.scss'

import { useState } from 'react';

import Sidebar from '../../components/Sidebar/Sidebar'
import SideDetails from '../../components/SideDetails/SideDetails';
import ChangeUserDetails from '../../Modals/ChangeUserDetails';
import NavItems from '../../Modals/NavItems/NavItems';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useModalContext } from '../../hooks/useModalContext';
import useFetchData from '../../hooks/useFetchData'
import { fi } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { redirect } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    // const {dispatch:test} = useAuthContext()
    // test({type:'LOGOUT'})

    const { OpenModal, OpenNavbar, dispatch } = useModalContext()
    const { user, doctor, name } = useAuthContext()
    
    console.log( user)

    const [updateDetailsModal, setUpdateDetailsModal] = useState(false)
    const [updateTableModal, setUpdateTableModal] = useState(false)

    //values for main update
    const [cholesterol, setCholesterol] = useState()
    const [glucose, setGlucose] = useState()
    const [bloodPressure, setBloodpressure] = useState()
    const [pulseRate, setPulserate] = useState()

    //values for thr table
    const [seriumCholesterol,setSeriumCholesterol] = useState()
    const [seriumTriglycerides,setSeriumTriglycerides] = useState()
    const [cholesterolHDL,setCholesterolHDL] = useState()
    const [cholesterolNHDL,setCholesterolNHDL] = useState()
    const [cholesterolLDL,setCholesterolLDL] = useState()
    const [cholesterolVLDL,setCholesterolVLDL] = useState()
    const [CHOL,setChol] = useState()
    const [LDL,setLdl] = useState()

    const { data, error, loading } = useFetchData(`/user/medical/${user._id}`)

    // console.log(data.medicalDeatils.cholesterol)

    //Chart Data
    const dataArray = [{ name: 'Page A', uv: 1300, pv: 2000, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 700, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 900, pv: 2400, amt: 2400 }];


    // data.medicalDeatils.cholesterol.forEach(element => {
    //     console.log(element)
    // });

    //Table Functions
    function createData(name, calories, fat) {
        return { name, calories, fat };
    }

    const rows = [
        createData('Serium Cholesterol', 159, "140.0 - 239.0"),
        createData('Serium Triglycerides', 237, "10.0 - 200.0"),
        createData('Cholesterol - H.D.L', 262, "35.0 - 85.0"),
        createData('Cholesterol - Non - H.D.l', 262, "55.0 - 189.0"),
        createData('Cholesterol - L.D.L', 356, "75.0 - 159.0"),
        createData('Cholesterol - VLDL', 356, "10.0 - 41.0"),
        createData('CHOL/HDL', 356, "2.0 - 5.0"),
        createData('LDL/RDL', 356, "0.01 - 3.30"),
    ];

    if (!loading) {
        rows[0].calories = data.cholesterolDetails.seriumCholesterol
        rows[1].calories = data.cholesterolDetails.seriumTriglycerides
        rows[2].calories = data.cholesterolDetails.cholesterolHDL
        rows[3].calories = data.cholesterolDetails.cholesterolNHDL
        rows[4].calories = data.cholesterolDetails.cholesterolLDL
        rows[5].calories = data.cholesterolDetails.cholesterolVLDL
        rows[6].calories = data.cholesterolDetails.CHOL
        rows[7].calories = data.cholesterolDetails.LDL

    }

    const handleNavbar = () => {
        dispatch({ type: 'OPEN_NAVBAR' })
    }

    let maxCholesterol
    let maxGlucose
    let maxPulseRate
    let maxBloodPressure
    let BMI = 0
    let healthyCheckBMI

    if (loading) {

    } else {
        maxCholesterol = data.medicalDeatils.cholesterol.length
        maxGlucose = data.medicalDeatils.glucose.length
        maxBloodPressure = data.medicalDeatils.bloodPressure.length
        maxPulseRate = data.medicalDeatils.pulseRate.length

        BMI = (data.weight / ((data.height * data.height)
            / 10000)).toFixed(2)

        if (BMI > 24.9) {
            healthyCheckBMI = 'High BMI Value'
        } else if (BMI < 18.9) {
            healthyCheckBMI = 'Low BMI Value'
        } else {
            healthyCheckBMI = 'Healthy BMI Value'
        }
    }
    return (
        <>
            {OpenNavbar && <NavItems />}

            <div className='change-user-details'>
                <ChangeUserDetails />
            </div>

            {/* update medical details */}

            <div className={updateDetailsModal ? 'change-details' : 'hide'}>
                <span className="material-symbols-outlined" onClick={() => setUpdateDetailsModal(false)}>close</span>
                <h3>Patient’s Medical Details</h3>

                <p>Update neccessary details</p>

                <input type='text' placeholder='Cholesterol' onChange={(e) => setCholesterol(e.target.value)}></input>
                <input type='text' placeholder='Pulse Rate' onChange={(e) => setPulserate(e.target.value)}></input>
                <input type='text' placeholder='Pressure' onChange={(e) => setBloodpressure(e.target.value)}></input>
                <input type='text' placeholder='glucose' onChange={(e) => setGlucose(e.target.value)}></input>

                {doctor && <button onClick={
                    async () => {
                        try {
                            const res = await axios.patch(`/user/medical/update/${user._id}`, {
                                cholesterol: cholesterol,
                                glucose: glucose,
                                bloodPressure: bloodPressure,
                                pulseRate: pulseRate

                            })
                        } catch (error) {
                            throw Error
                        }

                        setUpdateDetailsModal(false)
                        window.location.reload();
                    }
                } >Update Details</button>}

            </div>

            {/* Update Table Details */}

            <div className={updateTableModal ? 'change-table-details' : 'hide'}>
                <span className="material-symbols-outlined" onClick={() => setUpdateTableModal(false)}>close</span>
                <h3>Patient’s Cholesterol Details</h3>

                <p>Update neccessary details</p>

                <div className='cholesterol-table'>
                    <div className='table-1'><input type='text' placeholder='SeriumCholesterol' onChange={(e)=>setSeriumCholesterol(e.target.value)}></input></div>
                    <div className='table-2'><input type='text' placeholder='seriumTriglycerides' onChange={(e)=>setSeriumTriglycerides(e.target.value)}></input></div>
                    <div className='table-3'><input type='text' placeholder='CholesterolHDL' onChange={(e)=>setCholesterolHDL(e.target.value)}></input></div>
                    <div className='table-4'><input type='text' placeholder='CholesterolNHDL' onChange={(e)=>setCholesterolNHDL(e.target.value)}></input></div>
                    <div className='table-6'><input type='text' placeholder='CholesterolLDL' onChange={(e)=>setCholesterolLDL(e.target.value)}></input></div>
                    <div className='table-5'><input type='text' placeholder='CholesterolVLDL' onChange={(e)=>setCholesterolVLDL(e.target.value)}></input></div>
                    <div className='table-7'><input type='text' placeholder='CHOL' onChange={(e)=>setChol(e.target.value)}></input></div>
                    <div className='table-8'><input type='text' placeholder='LDL' onChange={(e)=>setLdl(e.target.value)}></input></div>
                </div>
                {doctor && <button onClick={async () => {
                    try {
                        const res = await axios.patch(`/user/medical/update/table/${user._id}`,{
                            seriumCholesterol,seriumTriglycerides,cholesterolHDL,cholesterolLDL,cholesterolNHDL,cholesterolVLDL,CHOL,LDL
                        })                       
                    } catch (error) {
                        throw Error
                    }
                    setUpdateTableModal(false)
                    window.location.reload();
                }}>Update Details</button>}

            </div>

            {OpenModal && <div className='dark'></div>}
            {updateTableModal && <div className='dark'></div>}
            {updateDetailsModal && <div className='dark'></div>}
  

            {loading ? <div className='loading'>loading...</div> : (
                <div className='home'>
                    <Sidebar />
                    <div className='navbar-image' onClick={handleNavbar}><span className="material-symbols-outlined" >menu</span></div>
                    <div className='home-container'>

                        <h3>Patient’s Medical Details</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim</p>

                        {/* ChangeUserDetails Modal */}

                        <div className='home-container-grid'>
                            <div className='card card-1'>
                                <h5>Cholesterol</h5>
                                <h2>{data.medicalDeatils.cholesterol[maxCholesterol - 1]}</h2>
                                <p>Flag Value ( 140.0 - 239.0 )</p>
                            </div>
                            <div className='card card-2'><h5>Glucose</h5>
                                <h2>{data.medicalDeatils.glucose[maxGlucose - 1]}</h2>
                                <p>Flag Value ( 70.0 - 99.0 )</p></div>
                            <div className='card card-3'><h5>BMI Value</h5>
                                <h2>{BMI}</h2>
                                <p>{healthyCheckBMI}</p>
                            </div>
                            <div className='card card-4'><h5>Pulse Rate</h5>
                                <h2>{data.medicalDeatils.pulseRate[maxPulseRate - 1]}</h2>
                                <p>Flag Value ( 60.0 - 100.0 )</p></div>
                            <div className='card card-5'><h5>Blood Pressure</h5>
                                <h2>{data.medicalDeatils.bloodPressure[maxBloodPressure - 1]}</h2>
                                <p>Flag Value ( 120/80 )</p></div>
                        </div>

                        {doctor && <button onClick={() => setUpdateDetailsModal(true)}>Update Details</button>}

                        <div className='cholesterol-chart'>
                            <h3>Cholesterol Details</h3>

                            <div className='cholesterol-table'>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Overall Details</TableCell>
                                                <TableCell align="right">Values</TableCell>
                                                <TableCell align="right">Flag Values</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.calories}</TableCell>
                                                    <TableCell align="right">{row.fat}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                            {/* Update Table Details */}

                            {doctor && <button onClick={() => setUpdateTableModal(true)}>Update Table Values</button>}

                            <h3>Cholesterol Graph</h3>

                            <div className='cholesterol-graph'>
                                <LineChart width={400} height={300} data={data.medicalDeatils.cholesterol} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey={(v) => v} stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </div>

                            <h3>Blood Pressure Graph</h3>

                            <div className='cholesterol-graph'>
                                <LineChart width={400} height={300} data={data.medicalDeatils.bloodPressure} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey={(v) => v} stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </div>

                            <h3>Pulse Rate Graph</h3>

                            <div className='cholesterol-graph'>
                                <LineChart width={400} height={300} data={data.medicalDeatils.pulseRate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey={(v) => v} stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </div>


                            <h3>Glucose Graph</h3>

                            <div className='cholesterol-graph'>
                                <LineChart width={400} height={300} data={data.medicalDeatils.glucose} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey={(v) => v} stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                    <SideDetails {...data} />
                </div>
            )}

            <p className='footer-text'>© 2022 Tharusha Geethanjana. All Rights Reserved </p>
        </>
    )
}

export default Home