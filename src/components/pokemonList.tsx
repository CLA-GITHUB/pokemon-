import { usePokemon } from "../context/PokemonContext";
import { Image, Shimmer, Breathing } from "react-shimmer";
import { Link } from "@tanstack/react-location";
export default function PokemonList() {
  const { pokemon } = usePokemon();
  return (
    <div>
      <div className='grid grid-cols-3 gap-2'>
        {pokemon.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <div className='shadow-md rounded p-3'>
              {
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  fallback={
                    <div className='w-32 mx-auto rounded-full'>
                      <Shimmer width={128} height={128} />
                    </div>
                  }
                />
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
