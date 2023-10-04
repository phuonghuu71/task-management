import { useState, useEffect, useRef } from "react";

import { BsFilterLeft } from "react-icons/bs";
import FilterItem from "./FilterItem";

import { useDispatch } from "react-redux";
import { getTask, filterTasks } from "../../controllers/task";

import PropTypes from "prop-types";

function Filter() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Status",
      isOpen: false,
      items: [
        {
          id: 1,
          value: "Open",
        },
        {
          id: 2,
          value: "In Progress",
        },
        {
          id: 3,
          value: "Done",
        },
      ],
    },
    {
      id: 2,
      title: "Priority",
      isOpen: false,
      items: [
        {
          id: 1,
          value: "Low",
        },
        {
          id: 2,
          value: "Medium",
        },
        {
          id: 3,
          value: "High",
        },
      ],
    },
  ]);

  // Click outside to close modal
  const modalRef = useRef();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  // Current Value
  const dispatch = useDispatch();

  const [currentValue, setCurrentValue] = useState({
    type: "",
    value: "",
  });

  useEffect(() => {
    if (
      currentValue !== undefined &&
      currentValue.value.length > 0 &&
      currentValue.type.length > 0
    ) {
      dispatch(getTask())
        .then(() => {
          dispatch(filterTasks(currentValue));
        })
        .then(() => {
          setModal(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    if (!modal) {
      const closeAll = properties.map((prop) => ({
        ...prop,
        isOpen: false,
      }));

      setProperties(closeAll);
    }
  }, [modal]);

  return (
    <div className=" relative">
      <div className="p-8 font-bold text-3xl">
        <BsFilterLeft
          data-test="filter-modal"
          onClick={() => setModal(!modal)}
          className={`${modal ? "text-blue-500" : ""}`}
        />
      </div>

      <div
        data-test="filter-modal-popup"
        ref={modalRef}
        className={`transition-all absolute left-8 z-40 w-44 ${
          modal ? "top-16" : "-top-96"
        }`}
      >
        <div className="bg-white border-2 rounded-md">
          {properties.map((prop) => {
            return (
              <FilterItem
                key={prop.id}
                prop={prop}
                setCurrentValue={setCurrentValue}
              />
            );
          })}

          <div className="w-full px-4 py-2">
            <button
              onClick={() => {
                dispatch(getTask()).then(() => {
                  setModal(false);
                });
              }}
              className="w-full bg-blue-500 p-2 text-white rounded-md hover:drop-shadow-md transition-all"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  setProps: PropTypes.func,
};

export default Filter;
