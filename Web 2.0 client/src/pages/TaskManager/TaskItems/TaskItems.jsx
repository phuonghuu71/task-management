/* Components */

import TaskItem from "./TaskItem";

/* Components */

import PropTypes from "prop-types";

function TaskItems({ taskDatasProps, setProps }) {
  return (
    <section className="relative flex-1 bg-blue-500 px-12 py-8">
      <div className="absolute bg-blue-500 w-12 h-12 -top-12 left-0">
        <div className="bg-white w-full h-full rounded-tr-none rounded-tl-none rounded-br-none rounded-bl-full"></div>
      </div>

      <div data-test="task-container" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[90%] z-20 pb-2 px-3 scrollbar">
        {taskDatasProps.isLoading ? (
          <div className="ring">
            Loading
            <span></span>
          </div>
        ) : taskDatasProps.taskDatas.length === 0 ? (
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
            <p className="scaleUp text-3xl text-gray-500 bg-white px-4 py-3 whitespace-nowrap rounded-md">
              Not Found
            </p>
          </div>
        ) : (
          taskDatasProps.taskDatas.map((task) => {
            return (
              <TaskItem
                _id={task.id}
                name={task.name}
                status={task.status}
                priority={task.priority}
                createdDate={task.createdAt}
                duedate={task.duedate}
                key={task.id}
                setTaskData={setProps.setTaskData}
                setModal={setProps.setModal}
                setIsEdit={setProps.setIsEdit}
              />
            );
          })
        )}
      </div>

      <div className="absolute bg-white w-12 h-12 top-0 right-0">
        <div className="bg-blue-500 w-full h-full rounded-tr-full rounded-tl-none rounded-br-none rounded-bl-none"></div>
      </div>
    </section>
  );
}

TaskItems.propTypes = {
  taskDatasProps: PropTypes.shape({
    taskDatas: PropTypes.array,
    isLoading: PropTypes.bool,
  }),
  setProps: PropTypes.shape({
    setTaskData: PropTypes.func,
    setModal: PropTypes.func,
    setIsEdit: PropTypes.func,
  }),
};

export default TaskItems;
