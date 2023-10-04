/* Library */

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

/* Library */

/* Redux */

import { getTask } from "../../controllers/task";

/* Redux */

/* Components */

import FilterTask from "./Filter/FilterTask";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CreateEditModal from "./CreateEditModal/CreateEditModal";

import Search from "./Search/Search";

import TaskItems from "./TaskItems/TaskItems";

import AddTask from "./AddTask/AddTask";

/* Components */

function App() {
  /* State Management */

  // Task
  const [taskData, setTaskData] = useState({
    name: "",
    priority: "",
    status: "Open",
    duedate: new Date(),
  });

  // Modal Open / Close state
  const [modal, setModal] = useState(false);

  // Edit Mode
  const [isEdit, setIsEdit] = useState(false);

  /* State Management */

  // Toast Configurations
  const options = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  /* GET Handling */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const { taskDatas, isLoading } = useSelector((state) => {
    return state.task;
  });

  /* GET Handling */

  const [login] = useState(false);

  return (
    <div className="flex justify-center items-center bg-blue-500 w-screen h-screen">
      <div className="relative flex flex-col w-96 h-5/6 bg-white drop-shadow rounded-2xl border-transparent border-2 overflow-hidden">
        {login ? (
          <>
            <p>hello</p>
          </>
        ) : (
          <>
            <FilterTask />

            <AddTask
              modal={modal}
              setProps={{
                setModal: setModal,
                setIsEdit: setIsEdit,
              }}
            />

            <Search />

            <TaskItems
              taskDatasProps={{
                taskDatas: taskDatas,
                isLoading: isLoading,
              }}
              setProps={{
                setTaskData: setTaskData,
                setModal: setModal,
                setIsEdit: setIsEdit,
              }}
            />
          </>
        )}

        <CreateEditModal
          datePickerProps={{
            selected: taskData.duedate,
            onChange: (date) => {
              setTaskData({
                ...taskData,
                duedate: date,
              });
            },
          }}
          toastProps={{
            options: options,
          }}
          taskDataProps={{
            taskData: taskData,
            setTaskData: setTaskData,
          }}
          modalProps={{
            modal: modal,
            setModal: setModal,
          }}
          isEditProps={{
            isEdit: isEdit,
            setIsEdit: setIsEdit,
          }}
        />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
