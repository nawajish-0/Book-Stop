import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-information`,
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/update-address`,
        Value,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-900 p-4 min-h-screen flex flex-col">
      {!ProfileData && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {ProfileData && (
        <div className="text-gray-200">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-400 mb-8">
            Settings
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="font-medium">Username</label>
              <p className="p-2 rounded bg-gray-800 mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Email</label>
              <p className="p-2 rounded bg-gray-800 mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label className="font-medium">Address</label>
            <textarea
              className="p-2 rounded bg-gray-800 mt-2 font-semibold resize-none"
              rows={5}
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
