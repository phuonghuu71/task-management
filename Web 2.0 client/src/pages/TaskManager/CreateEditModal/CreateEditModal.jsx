/* Library */

import { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";

/* Library */

/* Redux */

import { createTask, updateTask } from "../../../controllers/task";

/* Redux */

/* Icon */

import { AiOutlineClose } from "react-icons/ai";

/* Icon */

/* Components */

import Dropdown from "../../../components/DropDown/DropDown";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Input from "../../../components/Input/Input";

import { toast } from "react-toastify";

/* Components */

import PropTypes from "prop-types";

function CreateEditModal({
  datePickerProps,
  toastProps,
  taskDataProps,
  modalProps,
  isEditProps,
}) {
  const dispatch = useDispatch();

  /* State Management */

  // Input
  const [input, setInput] = useState({
    value: "",
    isActive: false,
  });

  // Modal Title
  const [title, setTitle] = useState("Create Task");

  // Priority
  const [priorities, setPriorities] = useState([
    {
      id: 1,
      value: "High",
      isSelected: false,
    },
    {
      id: 2,
      value: "Medium",
      isSelected: false,
    },
    {
      id: 3,
      value: "Low",
      isSelected: false,
    },
  ]);

  /* State Management */

  /* Modal Handling */

  const modalRef = useRef();

  // Click outside to close modal
  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        modalProps.setModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  // Handling when Modal is opened
  useEffect(() => {
    // In Creating Mode
    if (modalProps.modal && !isEditProps.isEdit) {
      setTitle("Create Task");

      setInput({
        value: "",
        isActive: false,
      });

      setPriorities(
        priorities.map((clearItem) => {
          return {
            ...clearItem,
            isSelected: false,
          };
        })
      );

      taskDataProps.setTaskData({
        ...taskDataProps.taskData,
        duedate: new Date(),
      });
    }

    // In Editing Mode
    if (modalProps.modal && isEditProps.isEdit) {
      setTitle("Edit Task");

      setInput({ isActive: true, value: taskDataProps.taskData.name });

      const getSelectedPriority = priorities.find(
        (priority) =>
          priority && priority.value === taskDataProps.taskData.priority
      );

      if (getSelectedPriority) {
        setPriorities(
          priorities.map((priority) => {
            if (priority === getSelectedPriority) {
              return {
                ...priority,
                isSelected: true,
              };
            }

            return priority;
          })
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalProps.modal]);

  // Modal Animation
  const displayRef = useRef(null);
  const visibleRef = useRef(null);

  useEffect(() => {
    const handleSetDisplay = (style) => {
      modalRef.current.style.display = style;
    };

    const handleSetVisible = (remove, add) => {
      modalRef.current.classList.remove(remove);

      modalRef.current.classList.add(add);
    };

    // Modal Animation
    if (modalProps.modal) {
      displayRef.current = setTimeout(handleSetDisplay, 200, "block");

      visibleRef.current = setTimeout(
        handleSetVisible,
        400,
        "-bottom-96",
        "bottom-0"
      );
    } else {
      visibleRef.current = setTimeout(
        handleSetVisible,
        200,
        "bottom-0",
        "-bottom-96"
      );

      displayRef.current = setTimeout(handleSetDisplay, 400, "none");
    }

    return () => {
      clearTimeout(displayRef.current);
      clearTimeout(visibleRef.current);
    };
  }, [modalProps.modal]);

  /* Modal Handling */

  /* Priority Handling */

  // Change value when select an item
  useEffect(() => {
    const getSelected = priorities.find(
      (priority) => priority && priority.isSelected
    );

    taskDataProps.setTaskData((taskData) => {
      return { ...taskData, priority: getSelected?.value };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priorities]);

  /* Priority Handling */

  /* Submit Handling */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (input.value.length === 0) {
      toast.error("Please insert name!", toastProps.options);

      return;
    }

    if (
      Date.parse(taskDataProps.taskData.duedate) <
      Date.parse(new Date().toLocaleString())
    ) {
      toast.error(
        "A time must be higher than current time!",
        toastProps.options
      );

      return;
    }

    if (priorities.filter((priority) => priority.isSelected).length === 0) {
      toast.error("Please choose priority!", toastProps.options);

      return;
    }

    // Check Mode
    if (isEditProps.isEdit) {
      dispatch(updateTask(taskDataProps.taskData));

      isEditProps.setIsEdit(false);

      toast.success("Task updated successfully!", toastProps.options);
    } else {
      dispatch(createTask(taskDataProps.taskData));

      toast.success("Task created successfully!", toastProps.options);
    }

    // Clear Data
    taskDataProps.setTaskData({
      ...taskDataProps.taskData,
      name: "",
      priority: "",
      status: "Open",
      duedate: new Date(),
    });

    modalProps.setModal(false);
  };

  /* Submit Handling */

  return (
    <section
      className={`absolute p-8 w-full h-62 z-30 left-0 bg-white rounded-t-3xl drop-shadow-2xl transition-all`}
      ref={modalRef}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-500">{title}</h2>

        <div
          onClick={() => modalProps.setModal(false)}
          className="text-lg hover:text-blue-500 transition-all text-gray-500"
        >
          <AiOutlineClose />
        </div>
      </div>

      <Input
        placeholder={"Name"}
        input={input}
        setInput={setInput}
        onChange={(e) => {
          setInput({
            ...input,
            value: e.target.value,
          });

          taskDataProps.setTaskData({
            ...taskDataProps.taskData,
            name: e.target.value,
          });
        }}
      />

      <div className="flex gap-2 mb-4">
        <div className="flex-1 date-picker-container">
          <p className="pl-2 mb-1 text-blue-500">Due date</p>
          <DatePicker
            {...datePickerProps}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="dd/MM/yyyy h:mm aa"
            className="date-picker"
            calendarClassName="calendar"
          />
        </div>
        <div className="w-32">
          <p className="pl-2 mb-1 text-blue-500">Priority</p>
          <Dropdown
            title={"Priority"}
            items={priorities}
            setItems={setPriorities}
          />
        </div>
      </div>

      <div>
        <button
          data-test={"submit"}
          onClick={(e) => handleSubmit(e)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md w-full font-semibold"
        >
          {title}
        </button>
      </div>
    </section>
  );
}

CreateEditModal.propTypes = {
  datePickerProps: PropTypes.shape({
    selected: PropTypes.object,
    onChange: PropTypes.func,
  }),
  toastProps: PropTypes.shape({
    options: PropTypes.object,
  }),
  taskDataProps: PropTypes.shape({
    taskData: PropTypes.object,
    setTaskData: PropTypes.func,
  }),
  modalProps: PropTypes.shape({
    modal: PropTypes.bool,
    setModal: PropTypes.func,
  }),
  isEditProps: PropTypes.shape({
    isEdit: PropTypes.bool,
    setIsEdit: PropTypes.func,
  }),
};

export default CreateEditModal;
