import ReactDOM from 'react-dom/client'
import HomeScreen from './pages/HomeScreen.jsx'
import LoginScreen from './pages/LoginScreen.jsx'
import RegisterScreen from './pages/RegisterScreen.jsx'
import ProfileScreen from './pages/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import SamplePage from './pages/SamplePage'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import ForgotPasswordPage from './pages/ForgotPassword.jsx'
import PasswordReset from './pages/PasswordReset.jsx'
import { NotFound } from './pages/NotFound.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/signup' element={<RegisterScreen />} />
      <Route path='/sample' element={<SamplePage />} />
      <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
      <Route path='/passwordReset' element={<PasswordReset />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='*' element={<NotFound/>} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
