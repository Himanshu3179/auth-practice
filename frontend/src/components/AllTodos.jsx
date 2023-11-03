import { useEffect, useState } from "react";
import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../redux/todoApiSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllTodos = () => {
  const { data, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation()
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState()

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

  const editHandler = async (todo) => {
    try {
      const res = await updateTodo({
        id: todo._id,
        title: todo.title,
        completed: todo.completed
      }).unwrap()
      console.log(res)
      toast.success('Todo updated successfully');
    } catch (error) {
      console.log("error:", error)
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
                id="title"
                value={todo.title}
                onChange={(e) => {
                  setTodoMsg(e.target.value)
                }}
                className="text-lg font-bold ml-2 bg-transparent outline-none w-[580px] truncate"
                readOnly={true}
              />
            </div>

            <div className="flex space-x-2">

              <button className=" w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 
              disabled:cursor-not-allowed
                              
              "
                onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                    updateTodo();
                  } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
              >
                {isTodoEditable ? "📁" : "✏️"}
              </button>

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
