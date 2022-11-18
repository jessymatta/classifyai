export interface ModalProps {
    open: boolean,
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
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