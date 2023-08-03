import { useState } from "react";
import { TodoType } from "../../models/TodoType";
import "../../App.css";

type PropsTodo = {
  todo: TodoType;
  onDelete: () => void;
  onUpdate: (updatedTodo: TodoType) => void;
  onToggleStatus: () => void;
};

const Todo = ({ todo, onDelete, onUpdate, onToggleStatus }: PropsTodo) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<TodoType>(todo);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    setFormData(todo);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    onUpdate(formData);
    setIsEditMode(false);
  };

  const handleToggleStatus = () => {
    const updatedTodo = { ...todo, status: !todo.status };
    onUpdate(updatedTodo);
  };

  return (
    <div className={`card mt-2 mb-2 ${todo.status ? "opacity-75" : ""}`}>
      <div className="card-body d-flex flex-row align-items-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={todo.status}
            onChange={handleToggleStatus}
          />
        </div>
        <div className="p-2 w-100">
          <h3 className={`card-title ${todo.status ? "completed" : ""}`}>
            {todo.title}
          </h3>
          <p className={`card-text ${todo.status ? "completed" : ""}`}>
            {todo.description}
          </p>
        </div>
        <div className="d-flex flex-column">
          {!isEditMode ? (
            <button className="btn btn-secondary mr-2" onClick={toggleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={onChange}
                className="form-control mb-2"
              />
              <button className="btn btn-success mr-2" onClick={onSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={toggleEditMode}>
                Cancel
              </button>
            </>
          )}
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
