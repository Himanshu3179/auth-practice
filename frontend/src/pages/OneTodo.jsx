import { useEffect, useState } from "react"
import { useGetTodoByIdQuery, useUpdateTodoMutation } from "../redux/todoApiSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

const OneTodo = () => {

    const [title, setTitle] = useState('')
    const [completed, setCompleted] = useState(false);

    const { id } = useParams()
    const { data, error, isLoading } = useGetTodoByIdQuery(id)

    const [updateTodo] = useUpdateTodoMutation()

    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setCompleted(data.completed)
        }
    }, [data])

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            console.log(completed)
            const res = await updateTodo({
                id: data._id,
                title,
                completed
            }).unwrap()
            console.log(res)
            toast.success('Todo updated successfully');
            navigate('/todos')

        } catch (error) {
            console.log("error:", error)
        }

    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    return (
        <div className="pt-24">
            {/* form */}
            <form action=""
                onSubmit={submitHandler}
                className=" w-fitflex flex-col gap-5">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                <button type="submit">Update Todo</button>
            </form>

            {/* go to all todos button */}
            <Link to="/todos">
                <button className="bg-blue-800 text-white px-3 py-2 rounded">
                    Go to all todos
                </button>
            </Link>
        </div>
    )
}

export default OneTodo