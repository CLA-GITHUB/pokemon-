import { Link } from "@tanstack/react-location";
import { usePokemon } from "../context/PokemonContext";

export default function SearchBox({ path = "home" }: { path?: string }) {
  const { search, setSearch } = usePokemon();

  return (
    <div className='flex justify-between items-center gap-3 py-4'>
      <Link to='/'>
        <img src='/pokeapi.png' alt='pokemon api logo' className='w-36' />
      </Link>
      {path === "home" ? (
        <input
          placeholder='Search'
          className='w-1/2 mt-3 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      ) : null}
    </div>
  );
}
