import { createContext, useContext, useReducer, useCallback } from "react";
import { toast } from "react-toastify";
import tasksApi from "../api/tasksApi";
import { LOADING_STATES, TOAST_MESSAGES } from "../utils/constants";

const initialState = {
  tasks: [],
  selectedTasks: [],
  loading: LOADING_STATES.IDLE,
  error: null,
  filters: {
    searchTerm: "",
    isCompleted: null,
  },
  pagination: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
  sortModel: [],
};

const actionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_TASKS: "SET_TASKS",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_SELECTED_TASKS: "SET_SELECTED_TASKS",
  SET_FILTERS: "SET_FILTERS",
  SET_PAGINATION: "SET_PAGINATION",
  SET_SORT_MODEL: "SET_SORT_MODEL",
  CLEAR_ERROR: "CLEAR_ERROR",
  RESET_STATE: "RESET_STATE",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload === LOADING_STATES.LOADING ? null : state.error,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        loading: LOADING_STATES.ERROR,
        error: action.payload,
      };

    case actionTypes.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: LOADING_STATES.SUCCESS,
        error: null,
        pagination: {
          ...state.pagination,
          total: action.payload.length,
        },
      };

    case actionTypes.ADD_TASK:
      const newTasks = [action.payload, ...state.tasks];
      return {
        ...state,
        tasks: newTasks,
        pagination: {
          ...state.pagination,
          total: newTasks.length,
        },
      };

    case actionTypes.UPDATE_TASK:
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
      };

    case actionTypes.DELETE_TASK:
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
        selectedTasks: state.selectedTasks.filter(
          (id) => id !== action.payload
        ),
        pagination: {
          ...state.pagination,
          total: filteredTasks.length,
        },
      };

    case actionTypes.SET_SELECTED_TASKS:
      return {
        ...state,
        selectedTasks: action.payload,
      };

    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 0 },
      };

    case actionTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };

    case actionTypes.SET_SORT_MODEL:
      return {
        ...state,
        sortModel: action.payload,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading:
          state.loading === LOADING_STATES.ERROR
            ? LOADING_STATES.IDLE
            : state.loading,
      };

    case actionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const actions = {
    setLoading: useCallback((loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    }, []),

    setError: useCallback((error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    }, []),

    clearError: useCallback(() => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    }, []),

    fetchTasks: useCallback(async () => {
      try {
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: LOADING_STATES.LOADING,
        });

        await delay(2500);

        const tasks = await tasksApi.getAll();
        dispatch({ type: actionTypes.SET_TASKS, payload: tasks });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
        toast.error(TOAST_MESSAGES.LOADING_ERROR);
      }
    }, []),

    createTask: useCallback(async (taskData) => {
      try {
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: LOADING_STATES.LOADING,
        });
        await delay(2500);
        const newTask = await tasksApi.create(taskData);
        dispatch({ type: actionTypes.ADD_TASK, payload: newTask });
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: LOADING_STATES.SUCCESS,
        });
        toast.success(TOAST_MESSAGES.TASK_CREATED);
        return newTask;
      } catch (error) {
        console.error("Error creating task:", error);
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
        toast.error("Görev oluşturulurken hata oluştu");
        throw error;
      }
    }, []),

    updateTask: useCallback(async (id, taskData) => {
      try {
        await delay(2500);
        const updatedTask = await tasksApi.update(id, taskData);
        dispatch({ type: actionTypes.UPDATE_TASK, payload: updatedTask });
        toast.success(TOAST_MESSAGES.TASK_UPDATED);
        return updatedTask;
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Görev güncellenirken hata oluştu");
        throw error;
      }
    }, []),

    updateTaskTitle: useCallback(async (id, title) => {
      try {
        await delay(2500);
        const updatedTask = await tasksApi.updateTitle(id, title);
        dispatch({ type: actionTypes.UPDATE_TASK, payload: updatedTask });
        toast.success("Başlık güncellendi");
        return updatedTask;
      } catch (error) {
        console.error("Error updating task title:", error);
        toast.error("Başlık güncellenirken hata oluştu");
        throw error;
      }
    }, []),

    toggleTaskComplete: useCallback(async (task) => {
      debugger;
      try {
        await delay(2500);
        task.isCompleted = !task.isCompleted;
        const updatedTask = await tasksApi.toggleComplete(task);
        dispatch({ type: actionTypes.UPDATE_TASK, payload: updatedTask });
        toast.success(
          task.isCompleted
            ? TOAST_MESSAGES.TASK_COMPLETED
            : TOAST_MESSAGES.TASK_UNCOMPLETED
        );
        return updatedTask;
      } catch (error) {
        console.error("Error toggling task completion:", error);
        toast.error("Görev durumu değiştirilirken hata oluştu");
        throw error;
      }
    }, []),

    deleteTask: useCallback(async (id) => {
      try {
        await delay(2500);
        await tasksApi.delete(id);
        dispatch({ type: actionTypes.DELETE_TASK, payload: id });
        toast.success(TOAST_MESSAGES.TASK_DELETED);
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Görev silinirken hata oluştu");
        throw error;
      }
    }, []),

    setSelectedTasks: useCallback((taskIds) => {
      dispatch({ type: actionTypes.SET_SELECTED_TASKS, payload: taskIds });
    }, []),

    setFilters: useCallback((filters) => {
      dispatch({ type: actionTypes.SET_FILTERS, payload: filters });
    }, []),

    setPagination: useCallback((pagination) => {
      dispatch({ type: actionTypes.SET_PAGINATION, payload: pagination });
    }, []),

    setSortModel: useCallback((sortModel) => {
      dispatch({ type: actionTypes.SET_SORT_MODEL, payload: sortModel });
    }, []),
  };

  const contextValue = {
    ...state,

    ...actions,

    completedTasks: state.tasks.filter((task) => task.isCompleted),
    pendingTasks: state.tasks.filter((task) => !task.isCompleted),
    totalTasks: state.tasks.length,
    isLoading: state.loading === LOADING_STATES.LOADING,
    hasError: state.loading === LOADING_STATES.ERROR,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export default TaskContext;
