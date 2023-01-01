import './signupdoctor.scss'

import { images } from '../../constants'

const SignupDoctor = () => {
    return (
        <div className='signup-user'>
            <div className='signup-userContainer'>
                <img src={images.logo}></img>
                <p>Signup as a Dcotor</p>

                <div className='signup-grid-doctor'>
                    <div className='grid-1'>
                        <input type='text' placeholder='Name'></input>
                    </div>

                    <div className='grid-2'>
                        <input type='email' placeholder='Email Address'></input>

                    </div>
                    <div className='grid-3'>
                        <input type='password' placeholder='password'></input>
                    </div>
                    <div className='grid-4'>
                        <input type='text' placeholder='Occupcation'></input>
                    </div>
                    <div className='grid-5'><input type="text" placeholder='Government Registration Number'></input></div>

                    <div className='grid-66'><input type="text" placeholder='NIC'></input></div>

                    <div className='grid-77'><input type="text" placeholder='Spiciality'></input></div>

                    <div className='grid-8'><input type="text" placeholder='Hospital'></input></div>


                </div>

                <button>Submit Application</button>

            </div>
        </div>
    )
}

export default SignupDoctor