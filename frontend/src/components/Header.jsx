import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/apiSlice";
import { removeCredentials } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(removeCredentials());
            toast.success("Logout successful");
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-blue-500 p-4 absolute w-full">
            <div className="container mx-auto flex justify-between items-center">
                {/* App name on the left */}
                <Link to="/" className="text-white text-xl font-bold">
                    Authentication App
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
                </ul>
            </div>
        </div>
    );
};

export default Header;
