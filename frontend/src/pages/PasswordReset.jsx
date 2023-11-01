import { useEffect, useState } from "react"
import { useResetPasswordMutation } from "../redux/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {

    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [resetPassword, { isLoading },] = useResetPasswordMutation();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const id = urlParams.get('id');

        console.log(token)
        console.log(id)
        setToken(token);
        setId(id);
    }, [])

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPassword({ userId: id, token, password }).unwrap();
            console.log(res);
            toast.success("Password reset successfully");
            navigate('/login');
        } catch (error) {
            console.log(error.data.message);
            toast.error(error.data.message);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center space-y-4 pt-24">
            <h2 className="text-2xl font-bold text-blue-500">Step 3: Enter New Password</h2>
            <form onSubmit={submitHandler} className="w-full max-w-xs">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                >
                    Submit
                </button>
            </form>
        </div>
    )


}

export default PasswordReset