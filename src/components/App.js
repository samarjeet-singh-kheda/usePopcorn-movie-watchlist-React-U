import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";

import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const tempQuery = "Planet of the Apes";

  /*

  useEffect(() => console.log("After initial render..."), []);

  useEffect(() => console.log("After every render..."));

  console.log("During render...");

  useEffect(() => console.log("D"), [query]);

  */

  /*

  fetch(
    `http://www.omdbapi.com/?t=blade+runner&apikey=${process.env.REACT_APP_OMDB_KEY}`
  )
    .then((res) => res.json())
    .then((data) => setMovies((movies) => [...movies, data]));

  setMovies(watched);

  */

  //!   Effect callbacks are synchronous to prevent race conditions.
  //!   useEffect must not return anything besides a function, which is used for clean-up.
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_OMDB_KEY}`
        );

        if (!res.ok)
          throw new Error("Something went wrong while fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        // console.log(data.Search);
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </nav>

      <main className="main">
        <Box>
          {/* {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} />
          )} */}

          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

/* <Box element={<MovieList movies={movies} />} />

<Box
  element={
    <>
      <WatchedSummary watched={watched} />
      <WatchedMoviesList watched={watched} />
    </>
  }
/> */
