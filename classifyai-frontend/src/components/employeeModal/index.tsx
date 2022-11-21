import React, { useState } from 'react'
import "./index.scss"
import Button from "../button"
import Input from "../input"
import { AddUserFormProps, AddUserFormErrors, ModalProps } from "./ModalAddUsers"
import DummyPP from "../../assets/images/dummy__pp.svg"
import { validateAddUserForm } from "../../helpers/addEmployeeValidations"
import { useAddOperator } from "../../query/operators/useOperators"
import { useAddSupervisor } from "../../query/supervisors/useSupervisors"
import LoadingSpinner from '../loadingSpinner'

const Modal = ({ onSuccess, supervisor }: ModalProps) => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        dob: "",
        password: "",
        confirmPass: ""
    };
    const { mutateAsync: addOperator, isSuccess: operatorAddedSuccess, isLoading: operatorInfoLoading } = useAddOperator();
    const { mutateAsync: addSupervisor, isSuccess: supervisorAddedSuccess, isLoading: supervisorInfoLoading } = useAddSupervisor();
    const [formValues, setFormValues] = useState<AddUserFormProps>(initialValues);
    const [formErrors, setFormErrors] = useState<AddUserFormErrors>({});
    const [profileBase64, setProfileBase64] = useState();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateAddUserForm(formValues);
        setFormErrors(errors);
        if (Object.keys(formErrors).length === 0) {
            let bodyFormData = new FormData();
            bodyFormData.append("first_name", formValues.firstName)
            bodyFormData.append("last_name", formValues.lastName)
            bodyFormData.append("email", formValues.email)
            bodyFormData.append("username", formValues.username)
            bodyFormData.append("dob", formValues.dob)
            bodyFormData.append("password", formValues.password)
            bodyFormData.append("password_confirmation", formValues.confirmPass)
            if (profileBase64) {
                bodyFormData.append("profile_pic_base64", profileBase64)
            }
            const postData = async () => {
                try {
                    if (supervisor) {
                        const results = await addSupervisor(bodyFormData)
                        return results;
                    }
                    const results = await addOperator(bodyFormData)
                    return results;
                } catch (err) {
                    console.log(err)
                }
            }
            postData();
        }
    }

    const cancelInputs = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({})
        setFormValues(initialValues)
    }

    const convertImage = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const image_file: File = (target.files as FileList)[0];
        let reader = new FileReader();
        reader.readAsDataURL(image_file);
        reader.onload = (e) => {
            let image_url: any = e.target?.result;
            setProfileBase64(image_url)
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
                <form onSubmit={handleAddUser}>

                    <p className="error">{formErrors?.firstName}</p>
                    <Input
                        name={"firstName"}
                        defaultValue={""}
                        type="text"
                        label="First Name"
                        onChange={handleChange}
                        required
                    />
                    <p className="error">{formErrors?.lastName}</p>
                    <Input
                        name={"lastName"}
                        defaultValue={""}
                        type="text"
                        label="Last Name"
                        onChange={handleChange}
                        required
                    />
                    <p className="error">{formErrors?.email}</p>
                    <Input
                        name={"email"}
                        defaultValue={""}
                        type="text"
                        label="Email"
                        onChange={handleChange}
                        required
                    />
                    <p className="error">{formErrors?.username}</p>
                    <Input
                        name={"username"}
                        defaultValue={""}
                        type="text"
                        label="Username"
                        onChange={handleChange}
                        required
                    />
                    <p className="error">{formErrors?.dob}</p>
                    <Input
                        name={"dob"}
                        defaultValue={""}
                        type="date"
                        label="dob"
                        onChange={handleChange}
                        required
                    />
                    <p className="error">{formErrors?.password}</p>
                    <Input
                        name={"password"}
                        defaultValue={""}
                        type="password"
                        label="Password"
                        onChange={handleChange}
                        required
                    />
                    <p className="error">{formErrors?.confirmPass}</p>
                    <Input
                        name={"confirmPass"}
                        defaultValue={""}
                        type="password"
                        label="Confirm Password"
                        onChange={handleChange}
                        required
                    />

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
                                operatorInfoLoading?"Adding the operator":"Adding the supervisor"}
                            bottomMsg={"This will take a few seconds"}
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

export default Modal