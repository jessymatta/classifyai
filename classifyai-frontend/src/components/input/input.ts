export interface InputProps {
    type: string;
    label: string;
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean,
    name:string;
}