import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/sign-in`,
          Values
        );

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-gray-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <h2 className="text-gray-200 text-2xl font-semibold text-center">Login</h2>
        <div className="mt-6">
          <div>
            <label htmlFor="username" className="text-gray-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-gray-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={submit}
            >
              Login
            </button>
          </div>
          <p className="flex mt-6 items-center justify-center text-gray-200 font-semibold">
            Or
          </p>
          <p className="flex mt-6 items-center justify-center text-gray-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/SignUp" className="text-blue-500 hover:underline">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
