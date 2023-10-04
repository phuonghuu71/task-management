const handleSort = (property) => {
  let sortOrder = 1;

  // If search descending
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    let result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const taskReducer = (state = { taskDatas: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };

    case "END_LOADING":
      return { ...state, isLoading: false };

    case "GET_TASK":
      return {
        ...state,
        taskDatas: action.payload,
      };

    case "CREATE_TASK":
      return {
        ...state,
        taskDatas: [action.payload, ...state.taskDatas],
      };

    case "FIND_TASK":
      return {
        ...state,
        taskDatas: state.taskDatas.filter(
          (task) =>
            task.name.toLowerCase().search(action.payload.toLowerCase()) !== -1
        ),
      };

    case "FILTER_TASK":
      return {
        ...state,
        taskDatas: state.taskDatas.filter((task) => {
          if (action.payload.type === "status") {
            return task.status === action.payload.value;
          }

          if (action.payload.type === "priority") {
            return task.priority === action.payload.value;
          }

          return task;
        }),
      };

    case "SORT_TASK":
      return {
        ...state,
        taskDatas: state.taskDatas
          // TODO: Map is used to make a copy of obj in arr
          // TODO: In order to prevent state muatation
          .map((value) => Object.assign({}, value))
          .sort(
            handleSort(
              action.payload.value === "asc"
                ? action.payload.type
                : `-${action.payload.type}`
            )
          ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        taskDatas: state.taskDatas.map((task) => {
          if (task.id !== action.payload.id) {
            return task;
          } else {
            return {
              ...task,
              ...action.payload,
            };
          }
        }),
      };

    case "DELETE_TASK":
      return {
        ...state,
        taskDatas: state.taskDatas.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
};

export default taskReducer;
