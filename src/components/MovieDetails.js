import { useRef, useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import KEY from "./KEY";

export default function MovieDetails({
    selectedMovieId,
    onCloseMovieDetails,
    onSetWatched,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);

    useEffect(() => {
        if (userRating !== "") {
            countRef.current++;
            console.log(countRef.current);
        }
    }, [userRating]);

    const isWatched = watched.some((movie) => movie.imdbID === selectedMovieId);

    const PreviousUserRating = watched.find(
        (movie) => movie.imdbID === selectedMovieId
    )?.userRating;

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

    const isTop = imdbRating >= 8.0;
    console.log(isTop);

    function handleAddToWatched() {
        // If the movie is already in the watched list, update the user rating
        if (isWatched) {
            onSetWatched(
                watched.map((movie) => {
                    if (movie.imdbID === selectedMovieId) {
                        return {
                            ...movie,
                            userRating: userRating ? Number(userRating) : null,
                            countRatingDecisions: (countRef.current += 1),
                        };
                    } else {
                        return movie;
                    }
                })
            );
            onCloseMovieDetails();
            return;
        }

        const newWatchedMovie = {
            imdbID: selectedMovieId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating: userRating ? Number(userRating) : null,
            countRatingDecisions: countRef.current,
        };

        onSetWatched((watched) => [...watched, newWatchedMovie]);
        onCloseMovieDetails();
    }

    useEffect(() => {
        const callback = (e) => {
            if (e.key === "Escape") {
                onCloseMovieDetails();
            }
        };

        document.addEventListener("keydown", callback);

        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [onCloseMovieDetails]);

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
                );
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedMovieId]
    );

    useEffect(() => {
        document.title = title
            ? `Movie | ${title.substring(0, 25)}`
            : "usePopcorn";

        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);

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
                        <div className="rating">
                            {isWatched && (
                                <>
                                    <p>
                                        <strong>You rated this movie </strong>
                                        {PreviousUserRating || "N/A"}
                                        <span>⭐</span>
                                    </p>
                                    <p> You can rate it again here: </p>
                                </>
                            )}
                            <StarRating
                                maxRating={10}
                                size={"24px"}
                                onSetRating={setUserRating}
                            />
                            {userRating > 0 && (
                                <button
                                    className="btn-add"
                                    onClick={handleAddToWatched}
                                >
                                    + Add to list
                                </button>
                            )}
                        </div>
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
