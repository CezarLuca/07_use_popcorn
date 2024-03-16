import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import KEY from "./KEY";

export default function MovieDetails({
    selectedMovieId,
    onCloseMovieDetails,
    onAddToWatched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAddToWatched() {
        const newWatchedMovie = {
            imdbID: selectedMovieId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
        };

        onAddToWatched(newWatchedMovie);
        onCloseMovieDetails();
    }

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
                );
                const data = await res.json();
                setMovie(data);
                // console.log(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedMovieId]
    );
    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button
                            className="btn-back"
                            onClick={() => onCloseMovieDetails()}
                        >
                            &larr;
                        </button>
                        <img src={poster} alt={`${title} poster`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                <span>🗓</span>
                                {released} &bull; {runtime}
                            </p>
                            <p> {genre} </p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDb Rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <StarRating
                            maxRating={10}
                            size={"24px"}
                            onSetRating={setUserRating}
                        />
                        <button
                            className="btn-add"
                            onClick={handleAddToWatched}
                        >
                            + Add to list
                        </button>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>
                            <strong>Starring:</strong> {actors}
                        </p>
                        <p>
                            <strong>Directed by:</strong> {director}
                        </p>
                    </section>
                </>
            )}
        </div>
    );
}
