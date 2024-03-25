import { useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery }) {
    const handleChange = (e) => {
        const value = e.target.value;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setQuery(capitalizedValue);
    };

    const inputElement = useRef(null);

    useEffect(() => {
        // console.log(inputElement.current);
        const callback = (e) => {
            if (e.key === "Enter") {
                inputElement.current.focus();
            } else if (e.key === "Escape") {
                setQuery("");
                inputElement.current.blur();
            }
        };
        document.addEventListener("keydown", callback);
        // inputElement.current.focus();
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [setQuery]);

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
