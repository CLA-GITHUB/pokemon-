import Layout from "./components/layout";
import PokemonList from "./components/pokemonList";
import SearchBox from "./components/searchbox";
import { Provider } from "./context/PokemonContext";
import {
  Router,
  ReactLocation,
  Outlet,
  useMatch,
} from "@tanstack/react-location";
import Details from "./pages/details";
import Pagination from "./components/pagination";

const location = new ReactLocation();

const routes = [
  {
    path: "/",
    element: (
      <>
        <SearchBox />
        <PokemonList />
        <Pagination />
      </>
    ),
  },
  {
    path: "/pokemon/:id",
    element: (
      <>
        <SearchBox path='details' />
        <Details />
      </>
    ),
  },
];

function App() {
  return (
    <Provider>
      <Router location={location} routes={routes}>
        <Layout>
          <Outlet />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
