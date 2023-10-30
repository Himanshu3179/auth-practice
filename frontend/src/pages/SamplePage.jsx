import toast from 'react-hot-toast';





const SamplePage = () => {
    const notify = () => toast.error('Here is your toast.');

    return (
        <div>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={notify}
            > click me</button>

        </div>
    )
}

export default SamplePage