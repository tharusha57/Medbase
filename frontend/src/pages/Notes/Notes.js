import Sidebar from '../../components/Sidebar/Sidebar'
import SideDetails from '../../components/SideDetails/SideDetails'
import Note from '../../components/Note/Note'
import ChangeUserDetails from '../../Modals/ChangeUserDetails'
import { useModalContext } from '../../hooks/useModalContext'
import useFetchData from '../../hooks/useFetchData'

import NavItems from '../../Modals/NavItems/NavItems'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'

import './notes.scss'
import axios from 'axios'

const Notes = () => {

    const [updateNote, setUpdateNote] = useState(false)
    const {user,doctor} = useAuthContext()
    const {data , error , loading} = useFetchData(`/user/medical/${user._id}`)
    const [note,setNote] = useState('')
    const { OpenModal, dispatch, OpenNavbar } = useModalContext()

    const handleNavbar = () => {
        dispatch({ type: 'OPEN_NAVBAR' })
    }

    return (
        <>

            {OpenNavbar && <NavItems />}

            {/* Update User Details */}
            <div className='change-user-details'>
                <ChangeUserDetails />
            </div>

            {/* Notes Modal */}
            <div className={updateNote ? 'change-details' : 'hide'}>
                <span className="material-symbols-outlined" onClick={() => setUpdateNote(false)}>close</span>
                <h3>Patient’s Medical Notes</h3>

                <p>Update neccessary details</p>

                <textarea type='text' placeholder='Add a new note ...' onChange={(e)=>setNote(e.target.value)}></textarea>

                {doctor && <button onClick={async() =>{
                    try{
                        const res = await axios.patch(`/user/medical/updateMedicalNotes/${user._id}`,{
                            note,doctor:user.name
                        })
                    }catch(error){
                        throw Error
                    }
                    setUpdateNote(false)
                    window.location.reload();
                }}>Add Note</button>}

            </div>

            {OpenModal && <div className='dark'></div>}
            {updateNote && <div className='dark'></div>}


            <div className='notes'>
                <Sidebar />
                {loading ? 'loading' : (<>
                    <div className='navbar-image' onClick={handleNavbar}><span className="material-symbols-outlined" >menu</span></div>

                    <div className='notes-container'>
                        <h3>Special Notes From Doctors</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim</p>

                        {doctor && <button onClick={() => setUpdateNote(true)}>Add New Note</button>}
                        
                        <div className='note-container'>
                            {[...data.notes].reverse().map((item,index) => {
                                return <Note {...item} key={index}/>
                            })}
                        </div>
                    </div>
                </>)}
                <SideDetails {...data}/>

                <p className='footer-text'>© 2022 Tharusha Geethanjana. All Rights Reserved </p>

            </div>
        </>
    )
}

export default Notes