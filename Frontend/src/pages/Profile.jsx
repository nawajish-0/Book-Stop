import  { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-information`,
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col md:flex-row py-8 px-4 md:px-12 gap-4 text-white">
      {!Profile ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/4 lg:w-1/5 h-auto lg:h-screen bg-gray-800 rounded-lg shadow-md p-4">
            <Sidebar data={Profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-3/4 lg:w-4/5 bg-gray-800 rounded-lg shadow-md p-6 overflow-hidden">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
