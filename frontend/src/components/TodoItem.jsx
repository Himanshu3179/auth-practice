/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../redux/todoApiSlice'
import toast from 'react-hot-toast'

const TodoItem = ({ todo }) => {
    const [todoMsg, setTodoMsg] = useState(todo.title)
    const [isTodoEditable, setIsTodoEditable] = useState(false)

    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()


    const toggleCompleted = async () => {
        try {
            const res = await updateTodo({
                id: todo._id,
                title: todo.title,
                completed: !todo.completed
            }).unwrap()
            console.log(res)
            toast.success('Todo updated successfully');
        } catch (error) {
            console.log("error:", error)

        }
    }

    const editTodo = async () => {
        try {
            const res = await updateTodo({
                id: todo._id,
                title: todoMsg,
                completed: todo.completed
            }).unwrap()
            console.log(res)
            setIsTodoEditable((prev) => !prev)
            toast.success('Todo updated successfully');
        }
        catch (error) {
            console.log("error:", error)
        }
    }


    const removeTodo = async (id) => {
        try {
            const res = await deleteTodo({
                id
            }).unwrap()
            console.log(res)
            toast.success('Todo deleted successfully');
        } catch (error) {
            console.log("error:", error)

        }
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className={`inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:opacity-90 shrink-0 disabled:opacity-50
                ${isTodoEditable ? "bg-green-500 text-white" : ""}

                ${todo.completed ? "cursor-not-allowed" : ""}
                `}
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => removeTodo(todo._id)}
            >
                ❌
            </button>
        </div>
    )
}

export default TodoItem