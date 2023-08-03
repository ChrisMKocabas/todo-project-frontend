// controllers/TodoController.ts
import { TodoType } from "../../models/TodoType";
import api from "../../models/Api";

const todosEndpoint = "/todos";

export const getTodos = async (): Promise<TodoType[]> => {
  try {
    const response = await api.get(todosEndpoint);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addTodo = async (todo: TodoType): Promise<TodoType> => {
  try {
    const response = await api.post(todosEndpoint, todo);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateTodo = async (
  id: number,
  todo: TodoType
): Promise<TodoType> => {
  try {
    const response = await api.put(`${todosEndpoint}/${id}`, todo);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await api.delete(`${todosEndpoint}/${id}`);
  } catch (err) {
    throw err;
  }
};
