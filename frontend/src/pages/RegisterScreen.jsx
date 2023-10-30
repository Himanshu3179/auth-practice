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
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Sign Up</h1>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input type="name" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        {/* loading */}
        {isLoading && <div>Loading...</div>}
        {/* error */}
        {error && <div>{error}</div>}
        {/* success */}
        {isSuccess && <div>Signup Success</div>}

        <div>
          <label />
          <button type="submit">Register</button>
        </div>

        <div>
          <label />
          <div>
            Already have an account? {' '}
            <a href="/login">Sign In</a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterScreen