import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../App/store";
import { deleteTask, markTaskCompleted } from "../utils/slice/AddTaskSlice";
import { useState } from "react";
import { DialogTask } from "./DialogTask";
import { Header } from "./Header";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export const CardView = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);


  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const handleDelete = (index: number) => {
    dispatch(deleteTask(index));
  };

  const handleComplete = (index: number) => {
    dispatch(markTaskCompleted(index));
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "All" ? true : task.status === filterStatus
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4 w-[85%] mx-auto mt-10">
        <select
          className="border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
        <Header onClick={() => setShowAddDialog(true)} />
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[85%] mx-auto mt-5">
        {filteredTasks.map((task, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between border border-transparent hover:border-primary transition duration-300"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{task.description}</p>
              <p className="text-sm text-gray-500 mb-1">Due: {task.dueDate}</p>
              <p
                className={`text-sm font-medium mb-2 ${
                  task.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {task.status}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className="text-sm text-white px-3 py-1 rounded bg-[#08a7f8] hover:opacity-90 transition"
                onClick={() => setEditingIndex(index)}
              >
                Edit
              </button>
              <button
                className={`text-sm text-white px-3 py-1 rounded bg-green-600 hover:opacity-90 transition ${
                  task.status === "Completed"
                    ? "cursor-not-allowed opacity-70"
                    : ""
                }`}
                onClick={() => handleComplete(index)}
                disabled={task.status === "Completed"}
              >
                {task.status === "Completed" ? "Done" : "Complete"}
              </button>
              <button
                className="text-sm text-white px-3 py-1 rounded bg-red-600 hover:opacity-90 transition"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[85%] mx-auto mt-5">
  {filteredTasks.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 text-lg">
      No task found.
    </div>
  ) : (
    filteredTasks.map((task, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between border border-transparent hover:border-blue-500 transition duration-300"
      >
        <div>
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-1">{task.description}</p>
          <p className="text-sm text-gray-500 mb-1">Due: {task.dueDate}</p>
          <p
            className={`text-sm font-medium mb-2 ${
              task.status === "Completed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {task.status}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <button
            className="text-sm text-white px-3 py-1 rounded bg-[#08a7f8] hover:opacity-90 transition"
            onClick={() => setEditingIndex(index)}
          >
            Edit
          </button>
          <button
            className={`text-sm text-white px-3 py-1 rounded bg-green-600 hover:opacity-90 transition ${
              task.status === "Completed" ? "cursor-not-allowed opacity-70" : ""
            }`}
            onClick={() => handleComplete(index)}
            disabled={task.status === "Completed"}
          >
            {task.status === "Completed" ? "Done" : "Complete"}
          </button>
          <button
            className="text-sm text-white px-3 py-1 rounded bg-red-600 hover:opacity-90 transition"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>


  {showAddDialog && (
        <DialogTask onClose={() => setShowAddDialog(false)} />
      )}
      {editingIndex !== null && (
        <DialogTask
          onClose={() => setEditingIndex(null)}
          task={filteredTasks[editingIndex]}
          taskIndex={tasks.indexOf(filteredTasks[editingIndex])}
        />
      )}
    </>
  );
};
