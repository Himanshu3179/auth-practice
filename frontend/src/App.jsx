import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';


function App() {

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // check if backend is up
    const checkBackend = async () => {
      try {
        const res = await fetch('/api');
        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
          setIsError(false);
        }

      } catch (error) {
        console.log("backend is down", error);
        setIsError(true);
      }
    }
    checkBackend();
  }
    , [])

  if (isError) {
    return (
      <div className='max-w-screen w-screen min-h-screen bg-slate-800'>
        <Header />
        <div className='pt-16 max-w-screen w-screen bg-slate-800 h-screen'>
          <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl text-center text-blue-500 dark:text-white">
              <span className="font-bold">Backend is down </span>
            </h1>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='max-w-screen min-h-screen bg-slate-800'>
      <Header />
      <div className='pt-16 max-w-screen  bg-slate-800 '>
        <Outlet />
      </div>
      <Toaster
        position='bottom-center'
      />
    </div>
  )
}

export default App
