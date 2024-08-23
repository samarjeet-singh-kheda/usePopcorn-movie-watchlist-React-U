import ListBox from "./listbox/ListBox";
import WatchedBox from "./watchedbox/WatchedBox";

function Main({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}

export default Main;
