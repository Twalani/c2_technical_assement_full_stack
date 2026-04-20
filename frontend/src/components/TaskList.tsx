import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];

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

const TaskList = ({
  tasks,
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
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editingTaskId={editingTaskId}
          editTitle={editTitle}
          editDescription={editDescription}
          setEditTitle={setEditTitle}
          setEditDescription={setEditDescription}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          saveEdit={saveEdit}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
          isEditValid={isEditValid}
        />
      ))}
    </ul>
  );
};

export default TaskList;