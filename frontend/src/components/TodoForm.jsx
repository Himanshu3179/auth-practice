import { useState } from "react";
import { useCreateTodoMutation } from "../redux/todoApiSlice"
import toast from "react-hot-toast";

const TodoForm = () => {

    const [title, setTitle] = useState('')

    const [createTodo] = useCreateTodoMutation()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await createTodo({ title }).unwrap()
            console.log(res)
            toast.success('Todo created successfully');
            setTitle('')
        } catch (error) {
            console.log(error)
            toast.error(error.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="flex">
                <input
                    type="text"
                    placeholder="Write Todo..."
                    className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                    Add
                </button>
            </form>
        </div>
    )
}

export default TodoForm