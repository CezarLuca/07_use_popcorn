import { useRef } from "react";

export default function SearchBar({ query, setQuery }) {
    const handleChange = (e) => {
        const value = e.target.value;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setQuery(capitalizedValue);
    };

    const inputElement = useRef(null);
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
