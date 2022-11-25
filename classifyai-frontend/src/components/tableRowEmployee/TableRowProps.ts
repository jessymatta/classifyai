import { UserDetails } from "../../routes/UserInterface";

export interface TableRowProps {
    user: UserDetails;
    supervisor?: boolean;
    supersupervisor?: boolean;
}