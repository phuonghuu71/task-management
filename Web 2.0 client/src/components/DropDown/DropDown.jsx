import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

import PropTypes from "prop-types";

function Dropdown({ items, setItems, title }) {
  const [selected, setSelected] = useState("");

  // Modal processing
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

  useEffect(() => {
    setItems(items);

    const getSelected = items.find((item) => item && item.isSelected);

    setSelected(getSelected ? getSelected.value : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div
      data-test={`dropdown-container-${title.toLowerCase()}`}
      className="relative w-full"
      ref={modalRef}
    >
      {modal ? (
        <ul className="absolute bottom-12 left-0 bg-white w-full shadow-md rounded-lg overflow-hidden scaleUp">
          {items.map((item, index) => {
            return (
              <li
                data-test={`dropdown-li-${title.toLowerCase()}-${index}`}
                onClick={() => {
                  setSelected(item.value);
                  setModal(false);

                  setItems(
                    items.map((clearItem) => {
                      return {
                        ...clearItem,
                        isSelected: clearItem === item && true,
                      };
                    })
                  );
                }}
                className={`px-2 py-1 hover:bg-blue-400 hover:text-white cursor-pointer ${
                  item.value === selected ? "bg-blue-500 text-white" : ""
                }`}
                key={item.id}
              >
                {item.value}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}

      <input
        type="text"
        className="input__input w-full cursor-pointer"
        onClick={() => setModal(!modal)}
        value={selected}
        placeholder="Priority"
        readOnly
      />

      <FaChevronDown
        className={`absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 ${
          modal ? "rotate-180" : "rotate-0"
        } transition-all`}
      />
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string,
      isSelected: PropTypes.bool,
    })
  ),
  setItems: PropTypes.func,
};

export default Dropdown;
