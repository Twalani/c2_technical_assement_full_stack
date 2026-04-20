interface Props {
    title: string;
    description: string;
  
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
  
    handleAdd: () => void;
  
    showForm: boolean;
    setShowForm: (value: boolean) => void;
  
    isFormValid: boolean;
  }
  
  const AddTaskForm = ({
    title,
    description,
    setTitle,
    setDescription,
    handleAdd,
    showForm,
    setShowForm,
    isFormValid,
  }: Props) => {
    return (
      <>
        <button
          className="add-toggle-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add New Task"}
        </button>
  
        {showForm && (
          <div className="input-group">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <button
              className="add-btn"
              onClick={handleAdd}
              disabled={!isFormValid}
            >
              Add
            </button>
          </div>
        )}
      </>
    );
  };
  
  export default AddTaskForm;