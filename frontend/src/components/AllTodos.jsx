import { useEffect } from "react";
import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../redux/todoApiSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllTodos = () => {
  const { data, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation()



  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  const toggleComplete = async (id, completed) => {
    try {
      const res = await updateTodo({
        id,
        completed,
      }).unwrap();
      console.log(res);
      toast.success("Todo updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }

    


  const deleteHandler = async (id) => {
    try {
      const res = await deleteTodo({ id }).unwrap();
      console.log(res);
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }

  return (
    <div className="space-y-4">
      {data &&
        data.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between bg-slate-700/50 p-4 rounded shadow"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleComplete(todo._id, e.target.checked)}
              />
              <input
                type="text"
                value={todo.title}
              
                className="text-lg font-bold ml-2 
                bg-transparent outline-none
                w-96
                "
                readOnly

              />
            </div>

            <div className="flex space-x-2">
              <Link to={`/todo/${todo._id}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteHandler(todo._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Del
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllTodos;
