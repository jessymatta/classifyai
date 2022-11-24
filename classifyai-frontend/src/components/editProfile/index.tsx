import { useState } from "react";
import Button from "../button";
import Input from "../input";
import LoadingSpinner from "../loadingSpinner";
import DummyPP from "../../assets/images/dummy__pp.svg";
import { validateEditProfileForm } from "../../helpers/editProfileValidations";
import Config from "../../constants/config.json";
import { useEditEmployee } from "../../query/common/useEmployee";
import { EditProfileModalProps, EditUserFormProps, EditUserFormErrors } from "./EditProfileInterfaces";

const EditProfileModal = ({ employee, onClose }: EditProfileModalProps) => {

    const [formValues, setFormValues] = useState<EditUserFormProps | any>(null);
    const [formErrors, setFormErrors] = useState<EditUserFormErrors>({});
    const [profileBase64, setProfileBase64] = useState();
    const { mutateAsync: editEmployee, isSuccess: editEmployeeSucess, isLoading: editEmployeeLoading } = useEditEmployee();
    const [serverErrors, setServerErrors] = useState<string[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateEditProfileForm(formValues);
        setFormErrors(errors);
        if (Object.keys(formErrors).length == 0) {

            if (profileBase64) {
                formValues["profile_pic_base64"] = profileBase64
            }

            const postData = async () => {
                try {
                    const results = await editEmployee({ id: employee.id, data: formValues })
                    return results;
                } catch (err: any) {
                    for (let key of Object.keys(JSON.parse(err.response.data))) {
                        if (key === "email") {
                            setServerErrors([...serverErrors, "Email is already taken"])
                        }
                        else if (key === "username") {
                            setServerErrors([...serverErrors, "Username is already taken"])
                        }
                        else {
                            setServerErrors([...serverErrors, "Something went wrong. Please Try again"])
                        }

                    }
                }
            }
            postData();
        }
    }

    if (editEmployeeSucess) {
        setTimeout(onClose
            , 2000);
    }

    return (
        <>
            <div className="left">
                {!employee.profile_pic_url ?

                    <img src={DummyPP} alt="pp" />
                    :
                    profileBase64 ?
                        <img src={profileBase64} alt="pp" />
                        : <img src={`${Config.BASE_URL_PP}/${employee.id}/${employee.profile_pic_url}`} alt="pp" />}
                <label className="upload_pp_label" htmlFor="pp">Edit Photo</label>
                <input
                    onChange={convertImage}
                    className="hide"
                    type="file"
                    id="pp"
                    accept=".jpg, .jpeg, .png"></input>

            </div>

            <div className="right">
                {serverErrors && serverErrors.map((error: string, index) => (
                    <p key={index} className='error'>{error}</p>
                ))}
                <form onSubmit={handleAddUser}>

                    <p className="error">{formErrors?.first_name}</p>
                    <Input
                        name={"first_name"}
                        defaultValue={employee.first_name}
                        type="text"
                        label="First Name"
                        onChange={handleChange}
                    />
                    <p className="error">{formErrors?.last_name}</p>
                    <Input
                        name={"last_name"}
                        defaultValue={employee.last_name}
                        type="text"
                        label="Last Name"
                        onChange={handleChange}
                    />
                    <p className="error">{formErrors?.email}</p>
                    <Input
                        name={"email"}
                        defaultValue={employee.email}
                        type="email"
                        label="Email"
                        onChange={handleChange}
                    />
                    <p className="error">{formErrors?.username}</p>
                    <Input
                        name={"username"}
                        defaultValue={employee.username}
                        type="text"
                        label="Username"
                        onChange={handleChange}
                    />
                    <p className="error">{formErrors?.dob}</p>
                    <Input
                        name={"dob"}
                        defaultValue={employee.dob ? employee.dob : ""}
                        type="date"
                        label="dob"
                        onChange={handleChange}
                    />

                    <div className='form_btns'>
                        <Button
                            text={"submit"}
                            classNames={["button--green", "button--fullwidth"]}
                        />

                        <Button
                            onClick={() => { }}
                            text={"cancel"}
                            classNames={["button--red", "button--fullwidth"]}
                        />
                    </div>

                    {editEmployeeLoading &&
                        <LoadingSpinner
                            topMsg={"Updating Employee Info"}
                            bottomMsg={"This will take few seconds"}
                            loading={true}
                        />
                    }

                    {editEmployeeSucess &&
                        <LoadingSpinner
                            successMsgTop={"Employee profile updated successfully"}
                            successMsgBottom={"This modal will close by itself in 2 seconds"}
                            success={true}
                        />
                    }

                </form>

            </div>
        </>
    )
}

export default EditProfileModal