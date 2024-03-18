import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onDeleteFromWatched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteFromWatched={onDeleteFromWatched}
                />
            ))}
        </ul>
    );
}
