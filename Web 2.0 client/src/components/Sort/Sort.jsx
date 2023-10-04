import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";

import { sortTasks } from "../../controllers/task";

import { BsSortDown } from "react-icons/bs";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

function Sort() {
  const modalRef = useRef();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div
        data-test="task-sort"
        onClick={() => setModal(!modal)}
        className="bg-blue-500 p-2 text-white rounded-md hover:drop-shadow-md transition-all"
      >
        <BsSortDown />
      </div>

      {modal && (
        <div
          data-test="task-sort-modal"
          ref={modalRef}
          className={`${
            modal ? "scaleUp" : "scaleDown"
          } absolute right-0 top-10 bg-white px-4 py-3 rounded-md drop-shadow-md`}
        >
          <div className="flex gap-2 items-center mb-2">
            <p className="whitespace-nowrap">Created At</p>
          </div>

          <div>
            <div
              data-test="task-sort-ascending"
              onClick={() => {
                setModal(false);

                dispatch(
                  sortTasks({
                    type: "createdAt",
                    value: "asc",
                  })
                );
              }}
              className={`flex gap-2 items-center px-3 py-1 mb-2 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer`}
            >
              <AiOutlineArrowUp />
              <p className="">Ascending</p>
            </div>
            <div
              data-test="task-sort-descending"
              onClick={() => {
                setModal(false);

                dispatch(
                  sortTasks({
                    type: "createdAt",
                    value: "desc",
                  })
                );
              }}
              className={`flex gap-2 items-center px-3 py-1 mb-2 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer`}
            >
              <AiOutlineArrowDown />
              <p className="">Descending</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sort;
