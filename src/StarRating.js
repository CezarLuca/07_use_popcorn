const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
};

const starContainerStyle = {
    display: "flex",
    gap: "0.25rem",
    alignItems: "center",
};

const textStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    lineHeight: "1",
    margin: "0",
};

export default function StarRating({ maxRating = 5 }) {
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <span>S{i + 1}</span>
                ))}
            </div>
            <p style={textStyle}>10</p>
        </div>
    );
}
