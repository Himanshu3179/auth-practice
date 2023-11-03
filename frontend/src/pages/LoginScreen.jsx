import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from "../redux/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/userSlice";
import toast from "react-hot-toast";
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate();


  useEffect(() => {
    if (userInfo) {
      toast.success('User logged in');
      navigate('/')
    }
  }, [userInfo, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
      toast.success('Login successful');
      navigate('/')
    } catch (error) {
      console.log(error.data.message)
      toast.error(error.data.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-full bg-gray-900  text-white">
      <form onSubmit={submitHandler} className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h1 className="block text-gray-300 text-xl font-bold mb-2">LogIn</h1>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="bg-gray-800 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-gray-800 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <Link to="/forgotPassword">
              <p className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-200">
                Forgot Password?
              </p>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {
            isLoading ?
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled
              >
                Logging In...
              </button>
              :
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                LogIn
              </button>

          }
        </div>

        <div className="mt-4">
          <div className="text-center">
            New customer? {' '}
            <Link to="/signup" className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-200">
              <p className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-200">
                Create your account
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>


  )
}

export default LoginScreen