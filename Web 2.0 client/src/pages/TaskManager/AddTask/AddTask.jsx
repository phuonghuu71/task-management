/* Library */

import moment from "moment";

/* Library */

/* Icon */

import { IoAdd } from "react-icons/io5";

/* Icon */

import PropTypes from "prop-types";

function AddTask({ modal, setProps }) {
  return (
    <section className="mb-4 px-8 flex justify-between items-top">
      <div>
        <h1 className="text-3xl font-bold">My Task</h1>
      </div>

      <div className="flex flex-col items-end">
        <button
          data-test="add"
          onClick={() => {
            setProps.setModal(!modal);

            setProps.setIsEdit(false);
          }}
          className="text-3xl w-12 h-12 bg-blue-500 flex justify-center items-center rounded-lg drop-shadow hover:drop-shadow-lg transition-all"
        >
          <IoAdd className="text-white font-bold" />
        </button>
        <p className="text-gray-500">
          {moment(new Date()).format("dddd, MMM Do YYYY")}
        </p>
      </div>
    </section>
  );
}

AddTask.propTypes = {
  modal: PropTypes.bool,
  setProps: PropTypes.shape({
    setModal: PropTypes.func,
    setIsEdit: PropTypes.func,
  }),
};

export default AddTask;
