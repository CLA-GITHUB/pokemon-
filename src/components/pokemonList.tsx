import { usePokemon } from "../context/PokemonContext";
import { useState } from "react";
import { Link } from "@tanstack/react-location";

export default function PokemonList() {
  const { pokemon } = usePokemon();
  const [, setLoad] = useState(true);

  return (
    <div>
      <div className='grid grid-cols-3 gap-2'>
        {pokemon.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <div className='shadow-md rounded p-3'>
              {
                <>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    onLoad={(e) => {
                      setLoad(false);
                    }}
                    onLoadStart={() => (
                      <div className='animate-pulse flex space-x-4'>
                        <div className='rounded bg-slate-300 h-32 w-32 mx-auto'></div>
                      </div>
                    )}
                    alt='pokemon image'
                  />
                </>
              }
              <p className='text-center font-semibold text-xl'>
                {pokemon.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
