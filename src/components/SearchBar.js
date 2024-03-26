import { useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery }) {
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const inputElement = useRef(null);

    useEffect(() => {
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
