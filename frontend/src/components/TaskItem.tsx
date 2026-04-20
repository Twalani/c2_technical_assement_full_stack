import { Task } from "../types/task";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  task: Task;
  editingTaskId: number | null;

  editTitle: string;
  editDescription: string;

  setEditTitle: (value: string) => void;
  setEditDescription: (value: string) => void;

  startEdit: (task: Task) => void;
  cancelEdit: () => void;
  saveEdit: (task: Task) => void;

  handleDelete: (id: number) => void;
  toggleComplete: (task: Task) => void;

  isEditValid: boolean;
}

const TaskItem = ({
  task,
  editingTaskId,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  startEdit,
  cancelEdit,
  saveEdit,
  handleDelete,
  toggleComplete,
  isEditValid,
}: Props) => {
  return (
    <li>
      {editingTaskId === task.id ? (
        <div className="edit-box">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={() => saveEdit(task)} disabled={!isEditValid}>
            Save
          </button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="task-text">
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
            <small>{task.description}</small>
          </div>

          <div className="actions">
            <button onClick={() => toggleComplete(task)}>
              <FaCheck color={task.completed ? "green" : "gray"} />
            </button>

            <button onClick={() => startEdit(task)}>
              <FaEdit />
            </button>

            <button onClick={() => handleDelete(task.id)}>
              <FaTrash color="red" />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;