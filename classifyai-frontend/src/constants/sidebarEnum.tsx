import { MdOutlineDashboard } from "react-icons/md"
import { RiFileExcel2Line, RiCustomerService2Line } from "react-icons/ri"
import { MdSupervisorAccount } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5"
import {ROLES} from "./roles"

export const sidesbarLabels = {
    [ROLES.Super_Supervisor]: [{ linkTo: "dashboard", icon: <MdOutlineDashboard size={30} />, labelName: "dashboard" },
    { linkTo: "operators", icon: <RiCustomerService2Line size={30} />, labelName: "operators" },
    { linkTo: "supervisors", icon: <MdSupervisorAccount size={30} />, labelName: "supervisors" },
    { linkTo: "scripts", icon: <RiFileExcel2Line size={30} />, labelName: "scripts" },
    { linkTo: "calls", icon: <IoCallOutline size={30} />, labelName: "calls" }
    ],
    [ROLES.Supervisor]: [{ linkTo: "dashboard", icon: <MdOutlineDashboard size={30} />, labelName: "dashboard" },
    { linkTo: "operators", icon: <RiCustomerService2Line size={30} />, labelName: "operators" },
    { linkTo: "scripts", icon: <RiFileExcel2Line size={30} />, labelName: "scripts" },
    { linkTo: "calls", icon: <IoCallOutline size={30} />, labelName: "calls" }
    ],
    [ROLES.Operator]: [{ linkTo: "dashboard", icon: <MdOutlineDashboard size={30} />, labelName: "dashboard" },
    { linkTo: "scripts", icon: <RiFileExcel2Line size={30} />, labelName: "scripts" },
    ],
}