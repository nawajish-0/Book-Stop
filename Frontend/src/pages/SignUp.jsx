import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/sign-up`,
          Values
        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    const profile = jwtDecode(credentialResponse.credential);
    setValues((prevValues) => ({
      ...prevValues,
      username: profile.name,
      email: profile.email,
    }));
  };

  return (
    <GoogleOAuthProvider clientId="982455320861-ub1r35mdj4jr23adohi83q5nrffm3gh5.apps.googleusercontent.com">
      <div className="bg-gray-900 h-screen flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg px-8 py-8 w-full md:w-4/6 lg:w-2/6">
          <h1 className="text-gray-200 text-2xl font-semibold text-center mb-6">Create Account</h1>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400">Username</label>
              <input
                type="text"
                className="w-full mt-2 bg-gray-900 text-gray-100 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your username"
                name="username"
                required
                value={Values.username}
                onChange={change}
              />
            </div>
            <div>
              <label className="text-gray-400">Email</label>
              <input
                type="email"
                className="w-full mt-2 bg-gray-900 text-gray-100 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="xyz@example.com"
                name="email"
                required
                value={Values.email}
                onChange={change}
              />
            </div>
            <div>
              <label className="text-gray-400">Password</label>
              <input
                type="password"
                className="w-full mt-2 bg-gray-900 text-gray-100 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your password"
                name="password"
                required
                value={Values.password}
                onChange={change}
              />
            </div>
            <div>
              <label className="text-gray-400">Address</label>
              <textarea
                className="w-full mt-2 bg-gray-900 text-gray-100 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your address"
                name="address"
                required
                value={Values.address}
                onChange={change}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
              onClick={submit}
            >
              Sign Up
            </button>
            {Values.username === "" && Values.email === "" && (
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
                render={(renderProps) => (
                  <button
                    className="w-full bg-white text-gray-900 font-semibold py-2 flex items-center justify-center rounded gap-4 hover:bg-gray-200 transition-all duration-300"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="text-3xl" /> Sign up with Google
                  </button>
                )}
              />
            )}
            <p className="flex mt-4 items-center justify-center text-gray-200 font-semibold">
              Or
            </p>
            <p className="flex mt-4 items-center justify-center text-gray-500 font-semibold">
              Already have an account? &nbsp;
              <Link to="/LogIn" className="hover:text-blue-500">
                <u>Log In</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
