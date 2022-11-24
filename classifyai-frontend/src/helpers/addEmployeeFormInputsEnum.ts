export const inputsFct = (password: string) => {
    const inputs = [{
        id: 1,
        name: "first_name",
        type: "text",
        placeholder: "",
        label: "First Name",
    },

    {
        id: 2,
        name: "last_name",
        type: "text",
        placeholder: "",
        label: "Last Name",
    },

    {
        id: 3,
        name: "email",
        type: "email",
        placeholder: "",
        errorMessage: "Not a valid email address!",
        label: "Email",
    },

    {
        id: 4,
        name: "username",
        type: "text",
        placeholder: "",
        label: "Username",
    },

    {
        id: 5,
        name: "dob",
        type: "date",
        placeholder: "",
        label: "Date of Birth",
    },

    {
        id: 6,
        name: "password",
        type: "password",
        placeholder: "",
        pattern: "[^ ]{8,16}",
        errorMessage: "Password must be at least 8 characters",
        label: "Password",
    },

    {
        id: 7,
        name: "password_confirmation",
        type: "password",
        placeholder: "",
        pattern: password,
        errorMessage: "Passwords do not match",
        label: "Confirm Password",
    },

    ]

    return inputs;
}

export const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    dob: "",
    password: "",
    password_confirmation: ""
};