import { UserDetails } from "../../routes/UserInterface";

export interface EditProfileModalProps {
    employee: UserDetails;
    onClose: () => void;
}

export interface EditUserFormProps {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    dob: string;
    profile_pic_base64: string;
}