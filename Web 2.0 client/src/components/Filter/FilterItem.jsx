import { useState, useEffect } from "react";

import { BsChevronRight } from "react-icons/bs";

import PropTypes from "prop-types";

function FilterItem({ prop, setCurrentValue }) {
  const [fetchProp, setFetchProp] = useState(prop);

  useEffect(() => {
    setFetchProp(prop);
  }, [prop]);

  return (
    <div className="px-4 py-2 cursor-pointer relative">
      <div
        data-test={`category-${fetchProp.title.toLowerCase()}`}
        onClick={() => {
          setFetchProp({
            ...fetchProp,
            isOpen: !fetchProp.isOpen,
          });
        }}
        className="flex items-center gap-2"
      >
        <BsChevronRight
          className={`${fetchProp.isOpen ? "rotate-90" : ""} transition-all`}
        />
        <p className="">{fetchProp.title}</p>
      </div>

      <div className="pl-4 rounded-md">
        {fetchProp.isOpen && (
          <div className="">
            {fetchProp.items.map((item) => (
              <p
                data-test={`filter-${item.value.toLowerCase()}`}
                key={item.id}
                className="py-1 rounded-md hover:bg-blue-400 hover:text-white px-2"
                onClick={() =>
                  setCurrentValue({
                    type: fetchProp.title.toLowerCase(),
                    value: item.value,
                  })
                }
              >
                {item.value}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

FilterItem.propTypes = {
  prop: PropTypes.object,
  setCurrentValue: PropTypes.func,
};

export default FilterItem;
