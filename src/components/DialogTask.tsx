import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../validation/validators";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../utils/slice/AddTaskSlice";
import type { AppDispatch } from "../App/store";

type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

type AddTaskDialogProps = {
  onClose: () => void;
  task?: TaskFormData; 
  taskIndex?: number;   
};

export const DialogTask = ({ onClose, task, taskIndex }: AddTaskDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: task || {
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
    },
  });

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    if (taskIndex !== undefined) {
    //  dispatch ------- edit task 
      dispatch(editTask({ index: taskIndex, updatedTask: data }));
    } else {
  //  dispatch ------- add task 
      dispatch(addTask({ ...data, status: "Pending" }));
    }
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[50%]">
        <h2 className="text-lg font-bold mb-4">
          {taskIndex !== undefined ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("title")}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              // type="text"
              {...register("description")}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter task description"
            >
              </textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded"
            >
              {taskIndex !== undefined ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
