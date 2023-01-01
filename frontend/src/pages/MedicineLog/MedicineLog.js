import './medicinelog.scss'
import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import SideDetails from '../../components/SideDetails/SideDetails'
import ChangeUserDetails from '../../Modals/ChangeUserDetails';
import { useModalContext } from '../../hooks/useModalContext';
import NavItems from '../../Modals/NavItems/NavItems';
import useFetchData from '../../hooks/useFetchData';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const MedicineLog = () => {

    const { OpenModal, dispatch, OpenNavbar } = useModalContext()
    const {user,doctor} = useAuthContext()
    console.log(doctor)
    const {data , error , loading} = useFetchData(`/user/medical/${user._id}`)
    const [medicine,setMedicine] = useState('')
    const [take,setTake] = useState()
    const [updateMedicalLog, setUpdateMedicalLog] = useState(false)

    //Table Function
    function createData(name, calories) {
        return { name, calories};
    }

    let rows = [];

    if(!loading){
        data.medicalLog.forEach((item) => {
            rows.push(createData(item.medicine , item.take))
        })
    }

    const handleNavbar = () => {
        dispatch({ type: 'OPEN_NAVBAR' })
    }
    return (

        <>
            {OpenNavbar && <NavItems />}

            {/* Change user details modal */}

            <div className='change-user-details'>
                <ChangeUserDetails />
            </div>

            {/* Update Medicine Log Modal */}
            <div className={updateMedicalLog ? 'change-details' : 'hide'}>
                <span className="material-symbols-outlined" onClick={() => setUpdateMedicalLog(false)}>close</span>
                <h3>Patient’s Medical Log</h3>

                <p>Add New Medicine</p>

                <input type='text' placeholder='Medicine' onChange={(e)=>setMedicine(e.target.value)}></input>
                <input type='text' placeholder='Take in Grams' onChange={(e)=>setTake(e.target.value)}></input>
                
                {doctor && <button onClick={async() => {
                    try{
                        const res = await axios.patch(`/user/medical/updateMedicalLog/${user._id}`,{
                            medicine,take
                        })
                    }catch(error){
                        throw Error
                    }                   
                    window.location.reload()
                    setUpdateMedicalLog(false)
                }}>Update Details</button>}

            </div>

            {OpenModal && <div className='dark'></div>}
            {updateMedicalLog && <div className='dark'></div>}


            <div className='medicine-log'>
                <Sidebar />
                {loading ? 'loading' : (
                    <><div className='navbar-image' onClick={handleNavbar}><span className="material-symbols-outlined" >menu</span></div>

                        <div className='medicine-log-container'>
                            <h3>Patient’s Medical Log</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim</p>

                            {doctor && <button onClick={() => setUpdateMedicalLog(true)}>Update Medical Log</button>}

                            <div className='log-container'>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Overall Details</TableCell>
                                                <TableCell align="right">Values</TableCell>
                        
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
                                              

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                        </div></>
                )}
                <SideDetails {...data}/>

                <p className='footer-text'>© 2022 Tharusha Geethanjana. All Rights Reserved </p>
            </div>
        </>
    )
}

export default MedicineLog