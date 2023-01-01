import './changeuserdetails.scss'

import { images } from '../constants'

import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useModalContext } from '../hooks/useModalContext';

const ChangeUserDetails = () => {

    const {OpenModal , dispatch} = useModalContext() 

    const handleClick = () =>{
        dispatch({type : 'CLOSE_MODAL'})
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className={OpenModal ? 'change-user-details ' : 'hide-modal'}>
            <div className='change-user-details-container'>
                <span className="material-symbols-outlined" onClick={handleClick}>close</span>
                <img src={images.logo}></img>
                <p>Change Only what you need, Other details will remain the same</p>

                <div className='change-details-grid'>
                    <div className='grid-1'>
                        <input type='text' placeholder='Name'></input>
                    </div>

                    <div className='grid-2'>

                        <input type="text" placeholder='Blood Type'></input>

                    </div>
                    <div className='grid-3'>
                        <input type='number' placeholder='Age'></input>
                    </div>
                    <div className='grid-77'>
                        <select name="gender" id="gender" className='gender'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className='grid-4'><input type="text" placeholder='Occupation'></input></div>

                    <div className='grid-5'><input type="number" placeholder='Weight'></input></div>

                    <div className='grid-66'><input type="number" placeholder='Height'></input></div>

                    <div className='grid-8'> <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)}></DatePicker><p>birth date</p></div>
                </div>
                <button onClick={handleClick}>Submit Application</button>

            </div>
        </div>
    )
}

export default ChangeUserDetails