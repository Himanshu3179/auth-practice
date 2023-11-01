import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "../redux/userSlice";
import toast from "react-hot-toast";

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const [signup, { isLoading, error, isSuccess }] = useSignupMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])



  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    }
    else {
      try {
        const res = await signup({ name, email, password }).unwrap()
        console.log(res)
        dispatch(setCredentials({ ...res }))
        toast.success('Signup successful');
        navigate('/')
      } catch (error) {
        console.log(error)
        toast.error(error.data);
      }
    }
  }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Sign Up</h1>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="name" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        {/* loading */}
        {isLoading && <div className="text-blue-500">Loading...</div>}
        {/* error */}
        {error && <div className="text-red-500">{error}</div>}
        {/* success */}
        {isSuccess && <div className="text-green-500">Signup Success</div>}

        <div className="flex items-center justify-center ">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Register
          </button>
        </div>

        <div className="mt-4">
          <div className="text-center">
            Already have an account? {' '}
            <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Sign In
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterScreen