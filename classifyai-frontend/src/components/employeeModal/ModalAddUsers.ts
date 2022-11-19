export interface ModalProps {
    onSuccess: () => void;
    supervisor?: boolean;
}

export interface AddUserFormProps {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    dob: string,
    password: string,
    confirmPass: string
}

export interface AddUserFormErrors {
    firstName?: string,
    lastName?: string,
    email?: string,
    username?: string,
    dob?: string,
    password?: string,
    confirmPass?: string
}