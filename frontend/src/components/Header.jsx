import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../redux/apiSlice";
import { removeCredentials } from "../redux/userSlice";
import toast from "react-hot-toast";


const Header = () => {

    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(removeCredentials());
            toast.success('Logout successful');
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="w-full h-16 bg-blue-200">
            <div className="space-x-10">

                {/* if not logged in t show signup and login button */}
                {!userInfo && (
                    <>
                        <Link to={"/signup"}>
                            <button>Signup</button>
                        </Link>
                        <Link to={"/login"}>
                            <button>Login</button>
                        </Link>
                    </>
                )}

                {/* show profile if logged in */}
                {userInfo && (
                    <Link to={"/profile"}>
                        <button>Profile</button>
                    </Link>
                )}

                {/* show test page */}

                <Link to={"/sample"}>
                    <button>Test Page</button>
                </Link>

                {/* show logout if logeed in */}
                {userInfo && (
                    <button
                        onClick={logoutHandler}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >Logout</button>
                )}

            </div>
        </div>
    )
}

export default Header