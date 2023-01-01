import './sidedetails.scss'
import { useLogout } from '../../hooks/useLogout'
import { useModalContext } from '../../hooks/useModalContext'
import { useAuthContext } from '../../hooks/useAuthContext';
const SideDetails = ({ username, email, age, occupation, gender, isDoctor, dateofbirth, bloodType, height, weight }) => {
    const { dispatch } = useModalContext()
    const { user, doctor } = useAuthContext()
    const { logout } = useLogout()

    const handleClick = () => {
        dispatch({ type: 'OPEN_MODAL' })
    }

    const handleLogout = () => {
        logout()
    }

    return (

        <div className='side-details'>

            <div className='user-details-container'>
                <div className='user-image'></div>
                <div className='user-details'>
                    <p className='username'>{user.email ? user.email : email}</p>
                    <div className='user-tag'>{user.name ? 'Doctor' : 'User'}</div>
                </div>

            </div>

            <div className='side-details-info'>
                <p className='doctor-name'><span style={{fontWeight: 'bold'}}>Doctor - </span> Dr. {user.name && user.name}</p>
                <h3>Patient Details</h3>

                <p>Full Name : {username}</p>
                <p>Date Of Birth : {dateofbirth}</p>
                <p>Age : {age}</p>
                <p>Gender : {gender}</p>
                <p>Occupation : {occupation}</p>
                <p>Blood Type : {bloodType}</p>
                <p>Height : {height} cm</p>
                <p>weight : {weight} kg</p>

                {!doctor && <button onClick={handleClick}>Change Details</button>}
                <button className='logout' onClick={handleLogout}>Log Out</button>

            </div>
        </div>
    )
}

export default SideDetails