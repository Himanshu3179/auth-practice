import { useState } from "react";
import EmailForm from "../components/EmailForm";



const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1); // Track the current step

    // Define a function to progress to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    return (
        <div className="w-screen h-screen flex">
            {step === 1 && <div className="flex flex-col w-fit justify-center items-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 border border-gray-400 shadow-lg rounded-md m-auto">
                <h1 className="mb-8 text-3xl font-extrabold text-center text-blue-500">Forgot Password</h1>
                <EmailForm nextStep={nextStep} />

            </div>
            }
            {/* show "reset password link sent sucessfully check you email"  on step===2*/}

            {step === 2 && <div className="flex flex-col w-fit justify-center items-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 border border-gray-400 shadow-lg rounded-md m-auto">
                <h1 className="mb-8 text-3xl font-extrabold text-center text-blue-500">Forgot Password</h1>
                <p className="text-xl font-bold text-center text-blue-500">Reset password link sent successfully. Check your email</p>

            </div>
            }



        </div>
    );
};

export default ForgotPasswordPage;
