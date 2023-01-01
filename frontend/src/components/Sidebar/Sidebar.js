import './sidebar.scss'

import { images } from '../../constants'
import { useAuthContext } from '../../hooks/useAuthContext'

const Sidebar = () => {

    const {user} = useAuthContext()

    return (
        <div className='sidebar'>
            <div className='sidebar-container'>
                <a href={`/medbase/${user._id}`}><img src={images.logomark_white}></img></a>
                <div className='sidebar-icons'>
                    <a href={`/medbase/${user._id}`}><div className='material-icon' title="Details"><span className="material-symbols-outlined ">monitor_heart</span></div>
                    </a>

                    <a href={`/medbase/medicinelog/${user._id}`}><div className='material-icon' title="Medical Log"><span className="material-symbols-outlined ">checklist_rtl</span></div>
                    </a>

                    <a href={`/medbase/notes/${user._id}`}>
                        <div className='material-icon' title="Notes"><span className="material-symbols-outlined ">document_scanner</span></div>
                    </a>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar