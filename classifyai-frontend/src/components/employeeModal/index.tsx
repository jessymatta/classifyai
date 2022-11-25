import React, { useState } from "react";
import "./index.scss";
import Button from "../button";
import Input from "../input";
import { AddUserFormProps, ModalProps } from "./ModalAddUsers";
import DummyPP from "../../assets/images/dummy__pp.svg";
import { useAddOperator } from "../../query/operators/useOperators";
import { useAddSupervisor } from "../../query/supervisors/useSupervisors";
import LoadingSpinner from "../loadingSpinner";
import { inputsFct, initialValues } from "../../helpers/addEmployeeFormInputsEnum";

const Modal = ({ onSuccess, supervisor }: ModalProps) => {

    const { mutateAsync: addOperator, isSuccess: operatorAddedSuccess, isLoading: operatorInfoLoading, error } = useAddOperator();
    const { mutateAsync: addSupervisor, isSuccess: supervisorAddedSuccess, isLoading: supervisorInfoLoading } = useAddSupervisor();
    const [formValues, setFormValues] = useState<AddUserFormProps>(initialValues);
    const [profileBase64, setProfileBase64] = useState();
    const [serverErrors, setServerErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const inputs = inputsFct(formValues.password);
    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerErrors([]);
        if (profileBase64) {
            formValues["profile_pic_base64"] = profileBase64;
        }

        try {
            if (supervisor) {
                const results = await addSupervisor(formValues);
                return results;
            }
            const results = await addOperator(formValues);
            return results;
        } catch (err: any) {
            for (let key of Object.keys(JSON.parse(err.response.data))) {
                if (key === "email") {
                    setServerErrors([...serverErrors, "Email is already taken"]);
                }
                else if (key === "username") {
                    setServerErrors([...serverErrors, "Username is already taken"]);
                }
                else {
                    setServerErrors([...serverErrors, "Something went wrong. Please Try again"]);
                }

            }
        }

    }


    const cancelInputs = (e: React.FormEvent) => {
        e.preventDefault();
        setFormValues(initialValues);
    }

    const convertImage = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const image_file: File = (target.files as FileList)[0];
        let reader = new FileReader();
        reader.readAsDataURL(image_file);
        reader.onload = (e) => {
            let image_url: any = e.target?.result;
            setProfileBase64(image_url);
        }
    }

    if (operatorAddedSuccess || supervisorAddedSuccess) {
        setTimeout(onSuccess
            , 3000);
    }

    return (
        <>
            <div className="left">
                {profileBase64 ?
                    <img src={profileBase64} alt="pp" />
                    :
                    <img src={DummyPP} alt="pp" />}
                <label className="upload_pp_label" htmlFor="pp">Upload Photo</label>
                <input onChange={convertImage} className="hide" type="file" id="pp" accept=".jpg, .jpeg, .png"></input>

            </div>

            <div className="right">
                {serverErrors && serverErrors.map((error: string, index) => (
                    <p key={index} className='error'>{error}</p>
                ))}
                <form onSubmit={handleAddUser}>
                    {inputs.map((input) => (
                        <Input
                            key={input.id}
                            name={input.name}
                            defaultValue={input.placeholder}
                            type={input.type}
                            label={input.label}
                            onChange={handleChange}
                            required
                            errorMessage={input.errorMessage}
                            pattern={input.pattern}
                        />
                    ))}

                    <div className='form_btns'>
                        <Button
                            text={"submit"}
                            classNames={["button--green", "button--fullwidth"]}
                        />

                        <Button
                            onClick={cancelInputs}
                            text={"cancel"}
                            classNames={["button--red", "button--fullwidth"]}
                        />
                    </div>

                    {(operatorInfoLoading || supervisorInfoLoading) &&
                        <LoadingSpinner
                            topMsg={
                                operatorInfoLoading ? "Adding the operator" : "Adding the supervisor"}
                            bottomMsg={"This will take  few seconds"}
                            loading={true}
                        />
                    }

                    {(operatorAddedSuccess || supervisorAddedSuccess) &&
                        <LoadingSpinner
                            successMsgTop={
                                operatorAddedSuccess ? "Operator added successfully" : "Supervisor added successfully"}
                            successMsgBottom={"This modal will close by itself in 3 seconds"}
                            success={true}
                        />
                    }

                </form>

            </div>
        </>

    )
}

export default Modal;