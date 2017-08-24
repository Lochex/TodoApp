import { LOAD_ALL_TASKS, UPDATE_TASK } from '../constants/actionTypes';

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ALL_TASKS :
      const { tasks } = action;
      return { ...state,
        tasks
      };

    // case UPDATE_TASK:
    //   const { task, taskId} = action;
    //   const taskToUpdate = state.tasks.find(task => task._id == taskId);
    //   const filteredTaskList = state.tasks.filter(task => task._id !== taskId);
    //   const updatedTask = { ...taskToUpdate, ...task };

    //   const updatedTaskList = filteredTaskList.concat(updatedTask);
    //   return { ...state,
    //     tasks: updatedTask
    //   };

    default:
      return state;
  }
};

export default taskReducer;
