export default function WatchedMovie({ movie, onDeleteFromWatched }) {
    const isValidNumber = (value) => !isNaN(Number(value));

    const imdbRating =
        movie.hasOwnProperty("imdbRating") && isValidNumber(movie.imdbRating)
            ? movie.imdbRating
            : "N/A";

    const userRating =
        movie.hasOwnProperty("userRating") && isValidNumber(movie.userRating)
            ? movie.userRating
            : "N/A";

    const runtime =
        movie.hasOwnProperty("runtime") && isValidNumber(movie.runtime)
            ? `${movie.runtime} min`
            : "N/A";

    return (
        <li>
            <img
                src={movie.poster}
                alt={`${movie.title.substring(0, 10)} poster`}
            />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{runtime} min</span>
                </p>

                <button
                    className="btn-delete"
                    onClick={() => onDeleteFromWatched(movie.imdbID)}
                >
                    {" "}
                    X{" "}
                </button>
            </div>
        </li>
    );
}
