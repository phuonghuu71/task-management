import * as api from "../api/index";

export const getTask = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await api.getTask();

    dispatch({
      type: "GET_TASK",
      payload: data,
    });

    dispatch({ type: "END_LOADING" });
  } catch (err) {
    console.log(err);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await api.createTask(task);

    dispatch({
      type: "CREATE_TASK",
      payload: data,
    });

    dispatch({ type: "END_LOADING" });
  } catch (err) {
    console.log(err);
  }
};

export const searchTasks = (search) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    // const { data } = await api.searchTasks(search);

    dispatch({
      type: "FIND_TASK",
      payload: search,
    });

    dispatch({ type: "END_LOADING" });
  } catch (err) {
    console.log(err);
  }
};

export const filterTasks = (filter) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    // const { data } = await api.filterTasks(filter);

    dispatch({
      type: "FILTER_TASK",
      payload: filter,
    });

    dispatch({ type: "END_LOADING" });
  } catch (err) {
    console.log(err);
  }
};

export const sortTasks = (sort) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    // const { data } = await api.sortTasks(filter);

    dispatch({
      type: "SORT_TASK",
      payload: sort,
    });

    dispatch({ type: "END_LOADING" });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(task);

    dispatch({
      type: "UPDATE_TASK",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask(id);

    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
