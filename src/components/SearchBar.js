import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export default function SearchBar({ query, onSetQuery }) {
    const handleChange = (e) => {
        const value = e.target.value;
        onSetQuery(value);
    };

    const inputElement = useRef(null);

    useEffect(() => {
        const callback = (e) => {
            if (
                e.key === "Enter" &&
                document.activeElement !== inputElement.current
            ) {
                inputElement.current.focus();
                onSetQuery("");
            } else if (e.key === "Escape") {
                inputElement.current.blur();
                // onSetQuery("");
            }
        };
        document.addEventListener("keydown", callback);
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [query, onSetQuery]);

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
