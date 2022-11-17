import { StylesConfig } from "react-select"
import { CSSProperties } from "react"
import { MyOptionType } from "./SelectTagProps"

const customControlStyles: CSSProperties = {
    color: "white",
    borderColor: "#949494",
    height: "50px",
    borderRadius: "10px",
    marginBottom: "20px",
};

type IsMulti = false;

export const selectStyle: StylesConfig<MyOptionType, IsMulti> = {
    control: (provided, state) => {
        return {
            ...provided,
            ...customControlStyles
        };
    }
};