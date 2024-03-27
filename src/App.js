import { useEffect, useState } from "react";
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
import { useMovies } from "./components/useMovies";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [watched, setWatched] = useState(() => {
        const storedWatched = localStorage.getItem("watched");
        return storedWatched ? JSON.parse(storedWatched) : [];
    });

    const { movies, isLoading, error } = useMovies(
        query,
        handleCloseMovieDetails
    );

    function handleMovieClick(movieId) {
        setSelectedMovieId((selectedMovieId) =>
            movieId === selectedMovieId ? null : movieId
        );
    }

    function handleCloseMovieDetails() {
        setSelectedMovieId(null);
    }

    function handleDeleteFromWatched(movieId) {
        setWatched((watched) =>
            watched.filter((movie) => movie.imdbID !== movieId)
        );
    }

    // The Add to Watched handler is in the MovieDetails component

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

    useMovies(query, handleCloseMovieDetails);

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
