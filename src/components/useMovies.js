export function useMovies() {
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
                setError("");
            } catch (error) {
                if (error.name === "AbortError") return;
                console.log(error.message);
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

        handleCloseMovieDetails();
        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query]);
}
