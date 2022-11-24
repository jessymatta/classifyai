export interface ModalProps {
    onSuccess: () => void;
    supervisor?: boolean;
}

export interface AddUserFormProps {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    dob: string;
    password: string;
    password_confirmation: string;
    profile_pic_base64?: string;
}