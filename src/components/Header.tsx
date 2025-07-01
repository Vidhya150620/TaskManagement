type AddTaskButtonProps = {
  onClick: () => void;
};
export const Header = ({ onClick }: AddTaskButtonProps) => {
  return (
    <>
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 float-right"
        onClick={onClick}
      >
        Add Task
      </button>
    </>
  );
};
