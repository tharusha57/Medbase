import './loginUser.scss'

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { images } from '../../constants';
import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData'
import { red } from '@mui/material/colors';

const LoginUser = () => {
    const [checked, setChecked] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const [users, setUsers] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [name,setName] = useState('')
    const navigate = useNavigate()

    const { user, loading, error, dispatch } = useAuthContext()
    const [searchedUserId, setSearchedUserId] = useState('')

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    if (searchedUserId) {
        const response = {
            _id:searchedUserId,
            name:name,
            email
        }
        const getUser = async () => {
            try {
                dispatch({ type: 'LOGIN_DOCTOR_SUCCESS', payload: response })
            } catch (error) {
                throw Error
            }
        }
        getUser()
    }

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = users.filter((value) => {
            return value.username.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    const handleSearchedUser = () => {

    }

    const loginUser = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.get('/user/medical')
            setUsers(res.data)
        } catch (error) {
            throw Error
        }
        // setUsers(allUsers.data)

        if (checked) {
            dispatch({ type: 'LOGIN_START' })
            try {
                const res = await axios.post('/user/logindoctor', { email, password })
                setName(res.data.name)
                setOpenSearchUser(true)
                // dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
                // navigate(`/medbase/${res.data._id}`)


                // const searchedUser = await axios('/:id')

                // dispatch({type:'DOCTOR_LOGIN_SUCCESS'})


            } catch (error) {
                dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message })
                console.log(error)
            }

        } else {
            dispatch({ type: 'LOGIN_START' })
            try {
                const res = await axios.post('/user/loginuser', { email, password })

                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
                navigate(`/medbase/${res.data._id}`)
            } catch (error) {
                dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message })

            }
        }
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    const blue = {
        100: '#DAECFF',
        200: '#80BFFF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E7EBF0',
        200: '#E0E3E7',
        300: '#CDD2D7',
        400: '#B2BAC2',
        500: '#A0AAB4',
        600: '#6F7E8C',
        700: '#3E5060',
        800: '#2D3843',
        900: '#1A2027',
    };

    const StyledInputElement = styled('input')(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      `,
    );

    const StyledTextareaElement = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      `,
    );

    return (
        <>

            {openSearchUser && <div className='dark'></div>}

            <div className={openSearchUser ? 'search-user' : 'hide'}>
                <div className='search-user-container'>
                    <input type="text" placeholder="search by username" className='inputs' onChange={handleFilter}></input>
                    <div className='dataResults'>
                        {filteredData.length != 0 && (
                            <div className="dataResult">
                                {filteredData.slice(0, 5).map((value, key) => {
                                    return (
                                        <div className='list-item' onClick={(e) => { setSearchedUserId(value._id) }}><p>{value.username} </p></div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>



            <div className='loginUser'>
                <div className='loginUserContainer'>
                    <div className='loginDetailsContainer'>
                        <img src={images.logo} className='logo'></img>
                        <p>{checked ? 'DOCTOR LOGIN' : 'USER LOGIN'}</p>

                        <FormControlLabel control={<Switch
                        />} label="Doctor" className='switch'
                            onChange={handleChange}
                        />

                        <input type="email" placeholder="Email Address" className='inputs' onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="Email Address" className='inputs' onChange={(e) => setPassword(e.target.value)}></input>

                        <button onClick={loginUser} disabled={loading}>Login</button>
                        <p className='error-message'> {error ? error : ''}</p>
                        <p className='forgot-password'>Forgot Password?</p>

                    </div>
                    <div className='signupDetailsContainer'>
                        <h4>New Here?</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim</p>

                        <a href={checked ? '/signupdoctor' : '/signupuser'}><button>Sign Up</button></a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginUser