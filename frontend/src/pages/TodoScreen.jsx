import TodoForm from "../components/TodoForm"
import AllTodos from "../components/AllTodos"

const TodoScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center text-white  pb-12 ">
            <div className="fixed top-14 left-0 right-0 flex flex-col bg-slate-800  items-center  max-w-4xl mx-auto z-10 p-5">
                <h1 className="text-4xl font-bold mb-8">Todo Screen</h1>
                <div className="w-full max-w-2xl">
                    <TodoForm />
                </div>
            </div>
            <div className="w-full max-w-3xl mt-4 pt-40">
                <AllTodos />
            </div>
        </div>
    )
}
export default TodoScreen