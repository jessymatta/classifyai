import "./index.scss";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { LoadingSpinnerProps } from "./LoadingSpinnerProps";

const LoadingSpinner = ({
    topMsg,
    bottomMsg,
    loading, success,
    successMsgTop,
    successMsgBottom }: LoadingSpinnerProps) => {

    return (

        <div className='spinner'>
            {loading &&
                <>
                    <p>{topMsg}</p>
                    <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                    <p>{bottomMsg}</p>
                </>
            }

            {success &&
                <div className='sucessMsg__container'>
                    <AiOutlineCheckCircle className='success__icon' />
                    <h6 className='success__msg'>{successMsgTop}</h6>
                    <p>{successMsgBottom}</p>
                </div>}
        </div>
    )
}

export default LoadingSpinner;