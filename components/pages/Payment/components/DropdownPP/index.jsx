import React from "react";

const DropdownPP = ({
    selectValueState,
    options,
    placeholderText,
    className = "",
    errorState,
    title,
    }) => {
    const [selected, setSelected] = selectValueState;
    const [error, setError] = errorState;
    const handleSelect = (e) => {
        e.preventDefault();
        setSelected(e.target.value);
        setError("");
    }

    return (
        <div className={`w-full my-4 flex-col space-y-0 ${className}`}>
            <h2 className="font-medium mb-2 text-sm">{title}</h2>
            <select
                onChange={(e) => handleSelect(e)}
                value={selected}
                className={`my-2 form-select marker:mx-4 marker:block w-full px-4 py-2 text-base font-normal ${selected.length > 0 ? "text-slate" : "text-ghost"
                    } bg-cloud bg-clip-padding bg-no-repeat border-2 border-solid ${error.length === 0 ? "border-cloud" : "border-red"
                    } rounded-lg disabled:text-ghost first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-cloud focus:border-blue-600 focus:outline-none`}
            >
                {placeholderText.length > 0 && (
                    <option className="w-full text-ghost" value="" disabled>
                        {placeholderText}
                    </option>
                )}
                {options.map((category, idx) => {
                    return (
                        <option key={idx} className="w-full text-black">
                            {category}
                        </option>
                    );
                })}
            </select>
            {error.length > 0 && (
                <p className="w-full text-right text-xs text-[#FF0000]">{error}</p>
            )}
        </div>
    );
};

export default DropdownPP;
