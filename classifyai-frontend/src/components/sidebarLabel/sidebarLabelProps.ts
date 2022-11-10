export interface SidebarLabelProps {
    icon: JSX.Element,
    labelName: string,
    linkTo?: string,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}