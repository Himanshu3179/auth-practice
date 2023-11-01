import { useState } from "react";
import { useForgotPasswordMutation } from "../redux/apiSlice";
import toast from "react-hot-toast";

const EmailForm = ({ nextStep }) => {
    const [email, setEmail] = useState("");

    const [forgotPassword, { isLoading, error, isSuccess },] = useForgotPasswordMutation();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await forgotPassword({ email }).unwrap();
            console.log(res);
            toast.success("Email sent successfully");
            nextStep();
        } catch (error) {
            console.log(error.data.message);
            toast.error(error.data.message);
        }

    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold text-blue-500">Step 1: Enter Your Email</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
    );
};

export default EmailForm;
