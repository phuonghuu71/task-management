import { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";

import { useDispatch } from "react-redux";

import { updateTask, deleteTask } from "../../../controllers/task";

import moment from "moment";

function TaskItem({
  _id,
  name,
  status,
  priority,
  duedate,
  createdDate,
  setModal,
  setTaskData,
  setIsEdit,
}) {
  // API processing
  const dispatch = useDispatch();
  const taskRef = useRef();

  const handleDeleteTask = () => {
    taskRef.current.classList.remove("scaleUp");

    setTimeout(() => {
      taskRef.current.style.transform = "translateX(-1000px)";
      dispatch(deleteTask(_id));
    }, 800);

    setTimeout(() => {
      taskRef.current.style.display = "none";
    }, 1000);
  };

  // Change status
  const [currentStatus, setCurrentStatus] = useState(false);

  useEffect(() => {
    if (currentStatus) {
      dispatch(
        updateTask({
          id: _id,
          name: name,
          status:
            status === "Open"
              ? "In Progress"
              : status === "In Progress"
              ? "Done"
              : "Open",
          priority: priority,
          duedate: new Date(duedate),
        })
      );

      setCurrentStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus]);

  const handleChanStatusTask = (e) => {
    e.preventDefault();

    setCurrentStatus(true);
  };

  return (
    <div
      data-test="task-item"
      ref={taskRef}
      className={`bg-white inline-block w-full h-28 rounded-2xl drop-shadow-md px-4 py-2 relative mb-4 last:mb-0 scaleUp transition-all`}
    >
      <div className="flex gap-2 justify-between items-center">
        <h2
          data-test={`task-item-title-${name
            .toLowerCase()
            .split(" ")
            .join("-")}`}
          className="flex-1 text-lg font-semibold "
        >
          {name}
        </h2>

        <div className="flex gap-2">
          <AiOutlineEdit
            data-test={`edit-item-${name.toLowerCase().split(" ").join("-")}`}
            onClick={() => {
              setModal(true);

              setIsEdit(true);

              setTaskData({
                id: _id,
                name: name,
                status: status,
                priority: priority,
                duedate: new Date(duedate),
              });
            }}
            className="font-semibold hover:text-yellow-500 cursor-pointer"
          />

          <BsTrash3
            data-test={`delete-item-${name.toLowerCase().split(" ").join("-")}`}
            onClick={() => handleDeleteTask()}
            className="font-semibold hover:text-red-500 cursor-pointer"
          />
        </div>

        <div
          data-test="task-item-priority"
          className="flex items-center gap-2 bg-gray-300 px-2 py-1 rounded-full"
        >
          <div
            className={`w-2 h-2 rounded-full ${
              priority === "High"
                ? "bg-red-500"
                : priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          ></div>
          <p className="text-xs mb-1">{priority}</p>
        </div>
      </div>

      <div>
        <p data-test="task-item-createdAt" className="hidden">
          {moment(createdDate).format("MM/DD/yyyy")}
        </p>
        <p className="text-gray-600">
          {"Due date: " + moment(duedate).format("DD/MM/yyyy")}
        </p>
      </div>

      <div
        data-test="task-item-status"
        className={`cursor-pointer absolute bottom-2 px-4 py-1 rounded-full w-fit ${
          status === "Open"
            ? "bg-gray-300"
            : status === "In Progress"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        onClick={(e) => handleChanStatusTask(e)}
      >
        <p className="text-white text-xs mb-1">{status}</p>
      </div>

      <div className="absolute bg-black w-fit -bottom-2 -right-2 px-4 py-2 rounded-br-2xl rounded-tl-2xl">
        <p className="text-white font-medium">{moment(duedate).format("LT")}</p>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  createdDate: PropTypes.string,
  duedate: PropTypes.string,
  setModal: PropTypes.func,
  setTaskData: PropTypes.func,
  setIsEdit: PropTypes.func,
};

export default TaskItem;
