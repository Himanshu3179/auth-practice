import { useEffect } from "react";
import { useGetAllUsersQuery } from "../redux/adminApiSlice";

const AdminPage = () => {
    const { data, isLoading } = useGetAllUsersQuery();

    useEffect(() => {
        console.log(data)
    }, [data])

    if (isLoading) return <div>Loading...</div>
    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Users</h1>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {data && data.map((user) => (
                    <div key={user._id}
                        className='w-full'
                    >
                        <div className="bg-gray-800 shadow-md rounded-lg px-4 py-3 text-white">
                            <h1 className="text-2xl font-bold text-center mb-8 mt-2">User : {user._id}</h1>
                            <div className="mb-4 flex justify-between">
                                <p className="text-gray-300 text-sm font-bold mb-2">Name: {user.name}</p>
                                <p className="text-gray-300 text-sm font-bold mb-2">Email: {user.email}</p>
                                <p className="text-gray-300 text-sm font-bold mb-2">Role: {user.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPage