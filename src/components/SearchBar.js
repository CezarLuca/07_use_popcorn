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
            if (
                e.key === "Enter" &&
                document.activeElement !== inputElement.current
            ) {
                inputElement.current.focus();
                setQuery("");
            } else if (e.key === "Escape") {
                inputElement.current.blur();
                setQuery("");
            }
        };
        document.addEventListener("keydown", callback);
        // inputElement.current.focus();
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [query, setQuery]);

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
