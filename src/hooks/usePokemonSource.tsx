import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (name: string) => void;
  loadLess: () => void;
  loadMore: () => void;
  pagination: {
    left: number;
    right: number;
  };
} {
  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
    pagination: {
      left: number;
      right: number;
    };
  };
  type PokemonAction =
    | {
        type: "setPokemon";
        payload: Pokemon[];
      }
    | { type: "setSearch"; payload: string }
    | { type: "loadMore"; payload: { left: number; right: number } }
    | { type: "loadLess"; payload: { left: number; right: number } };

  const [{ pokemon, search, pagination }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case "setPokemon":
          return { ...state, pokemon: action.payload };

        case "setSearch":
          return { ...state, search: action.payload };

        case "loadMore":
          return {
            ...state,
            pagination: {
              left: action.payload.left,
              right: action.payload.right,
            },
          };

        case "loadLess":
          return {
            ...state,
            pagination: {
              left: action.payload.left,
              right: action.payload.right,
            },
          };
      }
    },
    {
      pokemon: [],
      search: "",
      pagination: {
        left: 0,
        right: 50,
      },
    }
  );

  const loadMore = useCallback(() => {
    let right = pagination.right;
    dispatch({
      type: "loadMore",
      payload: {
        left: right,
        right: right + 50,
      },
    });
  }, [pagination.right, pagination.left]);

  const loadLess = useCallback(() => {
    let left = pagination.left;
    dispatch({
      type: "loadLess",
      payload: {
        left: left - 50,
        right: left,
      },
    });
  }, [pagination.right, pagination.left]);

  const sortedPokemon = useMemo(
    () => [...pokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [pokemon]
  ).slice(pagination.left, pagination.right);
  const setSearch = useCallback((text: string) => {
    dispatch({ type: "setSearch", payload: text });
  }, []);
  const filteredPokemon = useMemo(
    () =>
      [...sortedPokemon].filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [sortedPokemon, search]
  );

  useEffect(() => {
    fetch("/pokemon.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "setPokemon", payload: data }));
  }, []);

  return {
    pokemon: filteredPokemon,
    search,
    setSearch,
    loadLess,
    loadMore,
    pagination,
  };
}
