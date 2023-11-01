import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useUpdateUserMutation } from "../redux/apiSlice";
import toast from "react-hot-toast";
import { setCredentials } from "../redux/userSlice";

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.user);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        console.log(userInfo)
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    id: userInfo._id,
                    name, email, password
                }).unwrap();
                console.log(res);
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully');
            } catch (error) {
                console.log(error);
                toast.error(error.data);
            }
        }
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            {isLoading && <h1 className="text-blue-500">Loading...</h1>}

            <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4 text-center">
                    <h1 className="block text-gray-700 text-xl font-bold mb-2">Profile</h1>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="name" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Update</button>
                </div>
            </form>
        </div>

    )
}

export default ProfileScreen