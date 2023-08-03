import { useState } from "react";
import { TodoType } from "../../models/TodoType";
import "../../App.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (todo: TodoType) => void;
};

const AddTodoModal = ({ isOpen, onClose, onAddTodo }: Props) => {
  const [formData, setFormData] = useState<TodoType>({
    title: "",
    description: " ",
    status: false,
    _id: 0,
    user: 0,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(formData);
    setFormData({
      title: "",
      description: " ",
      status: false,
      _id: 0,
      user: 0,
    });
    onClose();
  };

  return (
    <div
      className="modal"
      style={{ display: isOpen ? "block" : "none" }}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h2>Add New Task</h2>
          <div className="form-group">
            <label>You want to do:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
              placeholder="Enter task here..."
            />
          </div>
          <div className="form-group">
            <label>Any details:</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={onChange}
              required
              placeholder="optional"
            />
          </div>
          <div className="d-flex flex-row">
            <button className="btn btn-success" type="submit">
              Add
            </button>
            <button
              className="btn btn-danger mx-2"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
