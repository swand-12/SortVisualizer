import { useState } from "react";
function ArraySizeInput({ arrays, setArrays }) {
    const handleChange = (e) => {
        setArrays(Number(e.target.value));
    };

    return (
        <>
            <label htmlFor="arraySize">Array Size: {arrays}</label>
            <input
                id="arraySize"
                type="range"
                min={5}
                max={100}
                value={arrays}
                onChange={handleChange}
            />
        </>
    );
}


export default ArraySizeInput;