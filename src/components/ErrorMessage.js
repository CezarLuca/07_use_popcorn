export default function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span role="img" aria-label="error">
                ⛔
            </span>
            {message}
            <span role="img" aria-label="error">
                ⛔
            </span>
        </p>
    );
}
