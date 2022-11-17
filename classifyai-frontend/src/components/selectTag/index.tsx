import Select from "react-select"
import { SelectTagProps } from "./SelectTagProps"
import { selectStyle } from "./selectTagConfig"

const SelectTag = ({ options, onChange }: SelectTagProps) => {

    return (
        <Select
            options={options}
            onChange={onChange}
            styles={selectStyle}
        />
    );
}

export default SelectTag;