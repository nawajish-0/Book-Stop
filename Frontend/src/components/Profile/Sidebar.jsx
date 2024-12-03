import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded flex flex-col h-auto lg:h-full shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <img src={data.avatar} alt="User Avatar" className="h-[12vh] rounded-full" />
        <p className="mt-3 text-2xl text-gray-100 font-semibold">{data.username}</p>
        <p className="mt-1 text-base text-gray-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-gray-600 hidden lg:block"></div>
      </div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex mt-6">
        {role === "user" ? (
          <>
            <Link
              to="/profile"
              className="text-gray-100 font-semibold w-full py-2 text-center hover:bg-gray-700 rounded transition-all duration-300"
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="text-gray-100 font-semibold w-full py-2 mt-4 text-center hover:bg-gray-700 rounded transition-all duration-300"
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="text-gray-100 font-semibold w-full py-2 mt-4 text-center hover:bg-gray-700 rounded transition-all duration-300"
            >
              Settings
            </Link>
          </>
        ) : role === "admin" ? (
          <>
            <Link
              to="/profile"
              className="text-gray-100 font-semibold w-full py-2 text-center hover:bg-gray-700 rounded transition-all duration-300"
            >
              All Orders
            </Link>
            <Link
              to="/profile/add-book"
              className="text-gray-100 font-semibold w-full py-2 mt-4 text-center hover:bg-gray-700 rounded transition-all duration-300"
            >
              Add Book
            </Link>
          </>
        ) : null}
      </div>

      <button
        className="bg-gray-700 w-3/6 lg:w-full mt-4 lg:mt-0 text-white flex font-semibold items-center justify-center py-2 rounded hover:bg-white hover:text-gray-900 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear();
          navigate("/");
        }}
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
