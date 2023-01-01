import './signupuser.scss'
import axios from 'axios';
import { useState } from 'react';
import { images } from '../../constants'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from '../../hooks/useAuthContext';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const SignupUser = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [occupcation, setOccupation] = useState('')
  const [age, setAge] = useState('')
  const [bloodtype, setBloodtype] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const dateofbirth = startDate
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/user/signupuser/', {
        username,
        email,
        password,
        gender,
        occupcation,
        age,
        dateofbirth
      })
      console.log(res.data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      navigate(`/medbase/${res.data._id}`)
    } catch (error) {
      console.log(error.response.data)
    }

  }

  return (
    <div className='signup-user'>
      <div className='signup-userContainer'>
        <img src={images.logo}></img>
        <p>Signup as a user</p>

        <div className='signup-grid'>
          <div className='grid-1'>
            <input type='text' placeholder='Name' onChange={(e) => setUsername(e.target.value)}></input>
          </div>

          <div className='grid-2'>
            <input type='email' placeholder='email Address'
              onChange={(e) => setEmail(e.target.value)}
            ></input>

          </div>
          <div className='grid-3'>
            <input type='password' placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className='grid-4'>
            <input type='text' placeholder='Occupcation'
              onChange={(e) => setOccupation(e.target.value)}
            ></input>
          </div>

          <div className='grid-5'><DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)}></DatePicker><p>birth date</p></div>

          <div className='grid-6'><input type="number" placeholder='Age'
            onChange={(e) => setAge(e.target.value)}
          ></input></div>

          <div className='grid-7'><select name="gender" id="gender" className='gender' onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select></div>
        </div>

        <button onClick={handleSubmit}>Create Account</button>

      </div>
    </div>
  )
}

export default SignupUser