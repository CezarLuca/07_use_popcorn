import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({
    watched,
    query,
    onDeleteFromWatched,
    onSetQuery,
}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    query={query}
                    onDeleteFromWatched={onDeleteFromWatched}
                    onSetQuery={onSetQuery}
                />
            ))}
        </ul>
    );
}
