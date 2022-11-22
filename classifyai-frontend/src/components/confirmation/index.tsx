import "./index.scss";
import Button from "../button";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDeleteEmployee } from "../../query/common/useEmployee";
import { ConfirmationPopupProps } from "./confirmationPopupProps";

const ConfirmationPopup = ({ onClose, id }: ConfirmationPopupProps) => {
    const { mutateAsync: deletEmployee, isSuccess: employeeDeletedSuccess } = useDeleteEmployee();

    const handleDeleteEmployee = async () => {
        try {
            await deletEmployee(id);
        } catch (err) {
            console.log(err);
        }
    }

    if (employeeDeletedSuccess) {
        onClose();
    }

    return (
        <div className='overlay'>
            <div className="confirmation">
                <AiOutlineCloseCircle className="deleteIcon" />
                <h2>Are you sure?</h2>
                <div className="confirmation__btns">

                    <Button
                        text={"delete"}
                        classNames={["button--fixedwidth", "button--red"]}
                        onClick={handleDeleteEmployee}
                    />

                    <Button
                        text={"cancel"}
                        classNames={["button--fixedwidth"]}
                        onClick={onClose}
                    />
                </div>

            </div>
        </div>
    )
}

export default ConfirmationPopup;
