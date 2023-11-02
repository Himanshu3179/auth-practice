import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const HomeScreen = () => {
  const { userInfo } = useSelector(state => state.user)

  return (
    <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {userInfo ?
        <div className="space-y-4 w-full max-w-md flex flex-col items-center">
          <h1 className="text-2xl text-center text-blue-500 dark:text-white">Welcome {userInfo.name}</h1>
          <Link to='/todos' className="dark:text-blue-400">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              View Todos
            </button>
          </Link>
        </div>
        :
        <h1 className="text-2xl text-center text-blue-500 dark:text-white">
          <Link to='/login' className="dark:text-blue-400">
            <span className="font-bold">Login </span>
          </Link>
          To view content </h1>
      }
    </div>
  )
}

export default HomeScreen