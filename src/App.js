import { useEffect, useState } from "react";
import KEY from "./components/KEY";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SearchBar from "./components/SearchBar";
import SearchResultsCounter from "./components/SearchResultsCounter";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import Summary from "./components/Summary";
import WatchedMoviesList from "./components/WatchedMoviesList";

// const tempWatchedData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//         runtime: 148,
//         imdbRating: 8.8,
//         userRating: 10,
//     },
//     {
//         imdbID: "tt0088763",
//         Title: "Back to the Future",
//         Year: "1985",
//         Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//         runtime: 116,
//         imdbRating: 8.5,
//         userRating: 9,
//     },
// ];

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    // const isWatched = watched.some((movie) => movie.imdbID === selectedMovieId);

    function handleMovieClick(movieId) {
        setSelectedMovieId((selectedMovieId) =>
            movieId === selectedMovieId ? null : movieId
        );
    }

    function handleCloseMovieDetails() {
        setSelectedMovieId(null);
    }

    // function handleAddToWatched(movie) {
    //     setWatched((watched) => [...watched, movie]);
    // }

    function handleDeleteFromWatched(movieId) {
        setWatched((watched) =>
            watched.filter((movie) => movie.imdbID !== movieId)
        );
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setError("");
                setIsLoading(true);
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error(
                        "Something went wrong with fetching the movies!"
                    );
                }

                const data = await res.json();

                if (data.Response === "False") {
                    throw new Error(data.Error);
                }

                setMovies(data.Search);
                console.log(data.Search);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 2) {
            setMovies([]);
            setError("");
            setIsLoading(false);
            return;
        }

        // setWatched(tempWatchedData);
        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query]);

    return (
        <>
            <NavBar>
                <SearchBar query={query} setQuery={setQuery} />
                <SearchResultsCounter movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {error && <ErrorMessage message={error} />}
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onMovieClick={handleMovieClick}
                        />
                    )}
                </Box>
                <Box>
                    {selectedMovieId ? (
                        <MovieDetails
                            selectedMovieId={selectedMovieId}
                            onCloseMovieDetails={handleCloseMovieDetails}
                            watched={watched}
                            onSetWatched={setWatched}
                        />
                    ) : (
                        <>
                            <Summary watched={watched} />
                            <WatchedMoviesList
                                watched={watched}
                                onDeleteFromWatched={handleDeleteFromWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
