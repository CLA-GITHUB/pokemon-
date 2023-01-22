import React,{ createContext, useContext } from "react";
import { usePokemonSource } from "../hooks/usePokemonSource";

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {}  as ReturnType<typeof usePokemonSource>
);

export function usePokemon(){
    return useContext(PokemonContext)
}

export const Provider = ({children}:{children: React.ReactNode}) => {
    return(
        <PokemonContext.Provider value={usePokemonSource()}>
            {children}
        </PokemonContext.Provider>
    )
}