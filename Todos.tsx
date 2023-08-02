import { useEffect, useState } from "react";
import Todo from "./components/ui/Todo";
import { TodoType } from "./models/TodoType";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./components/controller/TodoService";
import AddTodoModal from "./components/ui/AddTodoModal";

const Todos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [formData, setFormData] = useState<TodoType>({
    title: "",
    description: "",
    status: false,
    _id: 0,
    user: 0,
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todosData = await getTodos();
      setTodos(todosData);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTodo = await addTodo(formData);
      setTodos([...todos, newTodo]);
      setFormData({
        title: "",
        description: "",
        status: false,
        _id: 0,
        user: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdate = async (id: number, updatedTodo: TodoType) => {
    try {
      const updated = await updateTodo(id, updatedTodo);
      if (updated) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === id ? updated : todo))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTodo = async (newTodo: TodoType) => {
    try {
      const addedTodo = await addTodo(newTodo);
      setTodos([...todos, addedTodo]);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter the todos into completed and uncompleted
  const uncompletedTodos = todos.filter((todo) => !todo.status);
  const completedTodos = todos.filter((todo) => todo.status);

  // Handle the toggle status for a todo
  const handleToggleStatus = async (id: number) => {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id);
      if (todoToToggle) {
        const updatedTodo = { ...todoToToggle, status: !todoToToggle.status };
        await updateTodo(id, updatedTodo);
        setTodos((prevTodos) => {
          return prevTodos.map((todo) =>
            todo._id === id ? updatedTodo : todo
          );
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-style d-flex flex-column">
      <form onSubmit={(e) => onSubmit(e)}>{/* Form input fields... */}</form>

      {/* Add a button to open the modal */}
      <button
        className="button-add-todo btn btn-success rounded-pill w-25 align-self-center"
        onClick={openModal}
      >
        + New Task
      </button>

      {/* Display uncompleted todos first */}
      {uncompletedTodos.map((todo) => (
        <Todo
          todo={todo}
          key={todo._id.toString()}
          onDelete={() => onDelete(todo._id)}
          onUpdate={(updatedTodo) => onUpdate(todo._id, updatedTodo)}
          showCheckbox={true}
          onToggleStatus={() => handleToggleStatus(todo._id)}
        />
      ))}

      {/* Display completed todos at the bottom */}
      {completedTodos.map((todo) => (
        <Todo
          todo={todo}
          key={todo._id.toString()}
          onDelete={() => onDelete(todo._id)}
          onUpdate={(updatedTodo) => onUpdate(todo._id, updatedTodo)}
          showCheckbox={true} // Hide the checkbox for completed todos
          onToggleStatus={function (): void {
            todo.status = !todo.status;
          }}
        />
      ))}

      {/* AddTodoModal */}
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTodo={handleAddTodo}
      />
    </div>
  );
};

export default Todos;
