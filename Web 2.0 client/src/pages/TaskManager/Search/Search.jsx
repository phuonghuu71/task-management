/* Library */

import { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";

/* Library */

/* Redux */

import { searchTasks, getTask } from "../../../controllers/task";

/* Redux */

/* Components */

import Sort from "../../../components/Sort/Sort";

import Input from "../../../components/Input/Input";

/* Components */

function Search() {
  /* State Management */

  // Search
  const [search, setSearch] = useState({
    value: "",
    isActive: false,
  });

  /* State Management */

  const dispatch = useDispatch();

  /* Search Handling */

  const searchRef = useRef();

  useEffect(() => {
    const pressEnter = (e) => {
      e.preventDefault(); 

      if (e.keyCode === 13) {
        if (search.value.length !== 0) dispatch(searchTasks(search.value));
        else dispatch(getTask());
      }
    };

    const ref = searchRef.current;

    ref.addEventListener("keyup", pressEnter);

    return () => ref.removeEventListener("keyup", pressEnter);
  });

  /* Search Handling */
  return (
    <section className="z-30 flex items-center gap-2 w-full h-20 px-8">
      <Input
        placeholder={"Search"}
        input={search}
        inputRef={searchRef}
        setInput={setSearch}
        onChange={(e) => {
          setSearch({
            ...search,
            value: e.target.value,
          });
        }}
      />

      <Sort />
    </section>
  );
}

export default Search;
