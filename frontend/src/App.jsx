import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <div className='max-w-screen w-screen min-h-screen '>
      <Header />
      <div className='my-2'>
        <Outlet />
      </div>
      <Toaster 
        position='bottom-center'
      />
    </div>
  )
}

export default App
