import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const HomeScreen = () => {
  const { userInfo } = useSelector(state => state.user)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {userInfo ?
        <h1 className="text-2xl text-center text-blue-500">Welcome {userInfo.name}</h1>
        :
        <h1 className="text-2xl text-center text-blue-500">
          <Link to='/login'>
            <span className="font-bold">Login </span>
          </Link>
          To view content </h1>
      }
    </div>
  )
}

export default HomeScreen