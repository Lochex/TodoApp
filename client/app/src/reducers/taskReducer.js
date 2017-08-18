import { LOAD_ALL_TASKS, UPDATE_TASK } from '../constants/actionTypes';

const initialState = {
  tasks: [],
}

const taskReducer = (state=initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ALL_TASKS :
      const { tasks } = action;
      return { ...state,
        tasks
      }

    case UPDATE_TASK:
      const { task, taskId} = action;
      console.log(task, '_____________ 5')
      const taskToUpdate = state.tasks.filter(task => task._id == taskId);
      console.log(taskToUpdate, '_____________ 6')
      const filteredTaskList = state.tasks.filter(task => task._id !== taskId);
      const updatedTask = [ task, ...filteredTaskList ];
      console.log(updatedTask, '_____________ 7')

      const updatedTaskList = filteredTaskList.concat(updatedTask);
      return { ...state,
          tasks: updatedTask
        }

    default:
    return state
  }
}
export default taskReducer;