import { Link, useMatch } from "@tanstack/react-location";
import React from "react";
import { usePokemon } from "../context/PokemonContext";
import { Image, Shimmer } from "react-shimmer";

function Details() {
  const {
    params: { id },
  } = useMatch();
  const { pokemon } = usePokemon();
  const pokemonData = pokemon.find((p) => p.id === +id);

  if (!pokemonData) {
    return <p>not found</p>;
  }
  return (
    <div className='mt-3'>
      <div className='grid grid-cols-1 items-center mt-40 md:grid-cols-2'>
        <img
          className='w-96 h-96 flex-shrink-0 mx-auto bg-black rounded-xl'
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
          alt=''
        />
        <div className='ml-3 mt-5 md:mt-0'>
          <h2 className='text-2xl font-bold'>{pokemonData.name}</h2>
          <div className='mt-3'>
            <h3 className='text-xl font-bold'>Stats</h3>
            <ul className='mt-3'>
              {[
                "hp",
                "attack",
                "defense",
                "special_attack",
                "special_defense",
                "speed",
              ].map((stat) => (
                <li key={stat} className='grid grid-cols-2'>
                  <span className='font-bold'>{stat}</span>
                  <span>{pokemonData[stat as keyof typeof pokemonData]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
