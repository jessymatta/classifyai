import { ActionMeta, SingleValue } from "react-select";

export type MyOptionType = {
    label: string | JSX.Element;
    value: string;
    key: number;
};

export interface SelectTagProps {
    options: MyOptionType[];
    onChange: (newSelections: SingleValue<MyOptionType>,
        actionMeta: ActionMeta<MyOptionType>) => void;
}