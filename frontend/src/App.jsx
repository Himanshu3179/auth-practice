import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <div className='max-w-screen w-screen min-h-screen '>
      <Header />
      <Outlet />
      <Toaster
        position='bottom-center'
      />
    </div>
  )
}

export default App
