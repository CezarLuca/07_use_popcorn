export default function Movie({ movie, onMovieClick }) {
    return (
        <li onClick={() => onMovieClick(movie.imdbID)}>
            <img
                src={movie.Poster}
                alt={`${movie.Title.substring(0, 10)} poster`}
            />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
