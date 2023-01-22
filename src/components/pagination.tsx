import React from "react";
import { usePokemon } from "../context/PokemonContext";

function Pagination() {
  const { loadLess, loadMore, pagination } = usePokemon();
  return (
    <div className='flex gap-1 items-center justify-end mb-5'>
      <button
        className='text-xl border border-black rounded p-2'
        onClick={loadLess}
        disabled={pagination.left === 0}
      >
        👈🏽
      </button>
      <button
        className='text-xl border border-black rounded p-2'
        onClick={loadMore}
      >
        👉🏽
      </button>
    </div>
  );
}

export default Pagination;
