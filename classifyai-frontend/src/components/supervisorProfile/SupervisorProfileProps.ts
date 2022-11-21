import { UserDetails } from "../../routes/UserInterface";

export interface SupervisorProfileProps {
    supervisor: UserDetails,
    onClose: () => void
}
