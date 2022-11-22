export interface ButtonProps {
    text: string;
    classNames?: Array<String>;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
}