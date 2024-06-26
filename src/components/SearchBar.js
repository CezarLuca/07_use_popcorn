// import { useEffect, useRef } from "react";
import { useRef } from "react";
import { useKey } from "./useKey";

export default function SearchBar({ query, onSetQuery }) {
    const handleChange = (e) => {
        const value = e.target.value;
        onSetQuery(value);
    };

    const inputElement = useRef(null);

    useKey("Enter", () => {
        if (document.activeElement !== inputElement.current) {
            inputElement.current.focus();
            onSetQuery("");
        }
    });

    useKey("Escape", () => {
        if (document.activeElement === inputElement.current) {
            inputElement.current.blur();
        }
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleChange}
            ref={inputElement}
        />
    );
}
