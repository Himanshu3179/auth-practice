import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/apiSlice";
import { removeCredentials } from "../redux/userSlice";
import toast from "react-hot-toast";

import { todoApiSlice } from "../redux/todoApiSlice";

const Header = () => {
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();


    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(removeCredentials());
            dispatch(todoApiSlice.util.resetApiState()); // Add this line
            toast.success("Logout successful");
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-blue-500 p-4 fixed w-full
            z-20
        ">
            <div className="container mx-auto flex justify-between items-center">
                {/* App name on the left */}
                <Link to="/" className="text-white text-xl font-bold">
                    Todo App
                </Link>
                <ul className="flex space-x-4">
                    {/* if not logged in show signup and login button */}
                    {!userInfo && (
                        <>
                            <li>
                                <Link
                                    to="/signup"
                                    className="text-white hover:underline"
                                >
                                    Signup
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="text-white hover:underline"
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )}

                    {/* show profile and logout if logged in */}
                    {userInfo && (
                        <>
                            <li>
                                <Link
                                    to="/todos"
                                    className="text-white hover:underline"
                                >
                                    Todos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="text-white hover:underline"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={logoutHandler}
                                    className="text-white hover:underline cursor-pointer"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                    {userInfo?.role === "admin" && (
                        <li>
                            <Link
                                to="/admin"
                                className="text-red-700 font-bold hover:underline"
                            >
                                Admin Page
                            </Link>
                        </li>
                    )}



                </ul>
            </div>
        </div>
    );
};

export default Header;
