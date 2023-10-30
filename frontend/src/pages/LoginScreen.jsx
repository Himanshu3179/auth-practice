import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/userSlice";
import toast from "react-hot-toast";
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const [login] = useLoginMutation()
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
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>


        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <label />
          <button type="submit">Sign In</button>
        </div>

        <div>
          <label />
          <div>
            New customer? {' '}
            <a href="/register">Create your account</a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginScreen