import './note.scss'

const Note = ({note , doctor}) => {
    return (
        <div className='note'>
            <p>
                {note}
            </p>
            <p className="doctor-name">By Dr. {doctor}</p>
        </div>
    )
}

export default Note