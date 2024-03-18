export default function WatchedMovie({ movie }) {
    const isValidNumber = (value) => !isNaN(Number(value));

    // let imdbRating, userRating, runtime;

    // if (movie.hasOwnProperty("imdbRating") && isValidNumber(movie.imdbRating)) {
    //     imdbRating = movie.imdbRating;
    // } else {
    //     imdbRating = "Imdb rating N/A";
    // }

    // if (movie.hasOwnProperty("userRating") && isValidNumber(movie.userRating)) {
    //     userRating = movie.userRating;
    // } else {
    //     userRating = "User rating N/A";
    // }

    // if (movie.hasOwnProperty("runtime") && isValidNumber(movie.runtime)) {
    //     runtime = movie.runtime;
    // } else {
    //     runtime = "Runtime N/A";
    // }

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
            </div>
        </li>
    );
}
