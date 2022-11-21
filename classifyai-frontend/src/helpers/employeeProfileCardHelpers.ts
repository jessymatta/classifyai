import { UserDetails } from "../routes/UserInterface"

export const EmployeeProfileCardLabels = (user: UserDetails) => {
    return [{ "label": "Name", "value": user.first_name + " " + user.last_name },
    { "label": "Email", "value": user.email },
    { "label": "username", "value": `@${user.username}` },
    { "label": "Date of Birth", "value": user.dob },
    { "label": "Joining Date", "value": user.created_at.split("T")[0] }]
}