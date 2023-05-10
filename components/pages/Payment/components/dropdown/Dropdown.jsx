import React from "react";

export function Dropdown({name, children, onClick, className,onChange}) {
    return (
        <select onClick={onClick} onChange={onChange} name={name} className={className}>
            {children}
        </select>
    )
}

export function Option({children, selected, className}) {
    return (
        <option  selected={selected} className={className}>
            {children}
        </option>
    )
}