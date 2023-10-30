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
        <div>
            {isLoading && <h1>Loading...</h1>}

            <form onSubmit={submitHandler}>
                <div>
                    <h1>Profile</h1>
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

                <div>
                    <label />
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>

    )
}

export default ProfileScreen