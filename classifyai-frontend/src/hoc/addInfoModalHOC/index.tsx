import "./index.scss"
import { ModalHOCProps } from "./ModalHOCProps"

const AddInfoModalHOC = ({ children, open, onClose, modalTitle, width }: ModalHOCProps) => {
    if (!open) return null
    return (
        <div className='overlay'>
            <div className="modal__container" style={{ width: width ? `${width}` : "65vw" }}>
                <div className="modal__title">
                    <p>{modalTitle}</p>
                    <p onClick={onClose} className='modal__close'>X</p>
                </div>

                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AddInfoModalHOC