import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  
  return (
    <div className="w-full flex flex-col items-center mt-4 lg:hidden">
      {role === "user" && (
        <>
          <Link
            to="/profile"
            className="text-gray-100 font-semibold w-full text-center hover:bg-gray-700 rounded p-3 transition-all duration-300 mb-2"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-gray-100 font-semibold w-full text-center hover:bg-gray-700 rounded p-3 transition-all duration-300 mb-2"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-gray-100 font-semibold w-full text-center hover:bg-gray-700 rounded p-3 transition-all duration-300 mb-2"
          >
            Settings
          </Link>
        </>
      )}
      {role === "admin" && (
        <>
          <Link
            to="/profile"
            className="text-gray-100 font-semibold w-full text-center hover:bg-gray-700 rounded p-3 transition-all duration-300 mb-2"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-gray-100 font-semibold w-full text-center hover:bg-gray-700 rounded p-3 transition-all duration-300 mb-2"
          >
            Add Book
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileNav;
