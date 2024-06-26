import { useState } from "react";
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
import { useLocalStorageState } from "./components/useLocalStorageState";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const { movies, isLoading, error } = useMovies(
        query,
        handleCloseMovieDetails
    );

    const [watched, setWatched] = useLocalStorageState("watched", []);

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

    useMovies(query, handleCloseMovieDetails);

    return (
        <>
            <NavBar>
                <SearchBar query={query} onSetQuery={setQuery} />
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
                                query={query}
                                onDeleteFromWatched={handleDeleteFromWatched}
                                onSetQuery={setQuery}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
