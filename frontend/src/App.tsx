import React, { useState } from "react";
import "./styles.css";
import { HiOutlineFilter } from "react-icons/hi";
import { BiSortAlt2 } from "react-icons/bi";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import { useTasks } from "./hooks/useTasks";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const {
    tasks,
    handleAdd,
    handleDelete,
    toggleComplete,
  
    editingTaskId,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
  
    startEdit,
    cancelEdit,
    saveEdit,
  } = useTasks();
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const isFormValid = title.trim().length > 1 && description.trim().length > 1;
  const isEditValid = editTitle.trim().length > 1 && editDescription.trim().length > 1;
  
  const filteredTasks = [...tasks]
    .filter((t) => {
      if (filter === "pending") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sort === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return 0;
    });

  return (
    <div className="page">
      <div className="container">
        <div className="header-section">
        <h1 className="title">ToDo App</h1>

        <AddTaskForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleAdd={async () => {
            await handleAdd(title, description);
            setTitle("");
            setDescription("");
            setShowForm(false);
          }}
          showForm={showForm}
          setShowForm={setShowForm}
          isFormValid={isFormValid}
        />
          <div className="top-bar">
            <div className="dropdown">
            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              className="icon-btn"
            >
              <HiOutlineFilter size={18} />
              Filter
            </button>

              {showFilter && (
                <div className="dropdown-menu">
                  <button onClick={() => { setFilter("all"); setShowFilter(false); }}>
                    All
                  </button>
                  <button onClick={() => { setFilter("pending"); setShowFilter(false); }}>
                    Pending
                  </button>
                  <button onClick={() => { setFilter("completed"); setShowFilter(false); }}>
                    Completed
                  </button>
                </div>
              )}
            </div>

            <div className="dropdown">
            <button
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="icon-btn"
            >
              <BiSortAlt2 size={18} />
              Sort
            </button>

              {showSort && (
                <div className="dropdown-menu">
                  <button onClick={() => { setSort("newest"); setShowSort(false); }}>
                    Newest
                  </button>
                  <button onClick={() => { setSort("oldest"); setShowSort(false); }}>
                    Oldest
                  </button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="divider"></div>

        <div className="task-list">
  <TaskList
    tasks={filteredTasks}
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
</div>
      </div>
    </div>
  );
}

export default App;