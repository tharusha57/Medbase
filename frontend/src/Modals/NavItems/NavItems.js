import './navitems.scss'
import { useModalContext } from '../../hooks/useModalContext'

const NavItems = () => {

    const { OpenNavbar , dispatch } = useModalContext()

    const handleClick = () => {
        dispatch({type : 'CLOSE_NAVBAR'})

        console.log(OpenNavbar)
    }

    return (
        <div className='navitems'>
            <span className="material-symbols-outlined navbar-close-image" onClick={handleClick}>close</span>

            <a href='/medbase/:id'><p>Details</p></a>
            <a href='/medbase/medicinelog/:id'><p>Medical Log</p></a>
            <a href='/medbase/notes/:id'><p>Notes</p></a>
            <a><p>View Patient Details</p></a>
        </div>
    )
}

export default NavItems