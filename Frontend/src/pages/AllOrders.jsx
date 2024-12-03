import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-all-orders`,
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ ...Values, status: value.trim() });  // Ensuring trimmed values
  };
  
  

  const submitChanges = async (i) => {
    try {
      const id = AllOrders[i]._id;
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
  
      // Log the entire response to inspect it
      console.log(response);
  
      // Check if update was successful (adjust based on actual response structure)
      if (response.data.success) {
        alert(response.data.message);
  
        // Update the state immediately to reflect the changes
        const updatedOrders = [...AllOrders];
        updatedOrders[i].status = Values.status;
        setAllOrders(updatedOrders);
        setOptions(-1); // Reset the options state
      } else {
        alert(response.data.message || "Failed to update the status.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the status.");
    }
  };
  
  

  // Remove the last order if necessary
  // if (AllOrders) {
  //   AllOrders.splice(AllOrders.length - 1, 1);
  // }

  return (
    <>
      {!AllOrders ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : AllOrders.length > 0 ? (
        <div className="h-screen p-4 text-gray-200">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-300 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-gray-800 w-full rounded-lg shadow-md py-2 px-4 flex gap-2">
            <div className="w-[5%]">
              <h1 className="text-center font-medium">S.No.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="font-medium">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="font-medium">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="font-medium">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="font-medium">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="text-center font-medium">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {AllOrders.map((items, i) => (
            <div
              key={items._id}
              className="bg-gray-800 w-full rounded-lg py-2 px-4 flex gap-4 hover:bg-gray-700 transition-all duration-300"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-400 font-semibold"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{items.book.desc.slice(0, 45)}...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">₹ {items.book.price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
  <h1 className="font-semibold">
    <button
      className="hover:scale-105 transition-all duration-300"
      onClick={() => setOptions(i)}
    >
      {(() => {
        const currentStatus = items.status ? items.status.trim() : "";
        switch (currentStatus) {
          case "Order Placed":
            return <span className="text-green-400">{currentStatus}</span>;
          case "Out for Delivery":
            return <span className="text-yellow-500">{currentStatus}</span>;
          case "Delivered":
            return <span className="text-blue-400">{currentStatus}</span>;
          case "Canceled":
            return <span className="text-red-500">{currentStatus}</span>;
          default:
            return <span className="text-gray-400">Unknown Status</span>;
        }
      })()}
    </button>
    <div className={`${Options === i ? "block" : "hidden"} flex mt-4`}>
      <select
        name="status"
        className="bg-gray-700 text-gray-300 border border-gray-600 rounded p-1"
        onChange={change}
        value={Values.status}
      >
        {["Order Placed", "Out for Delivery", "Delivered", "Canceled"].map(
          (status) => (
            <option value={status} key={status}>
              {status}
            </option>
          )
        )}
      </select>
      <button
        className="text-green-400 hover:text-green-600 mx-2"
        onClick={() => {
          setOptions(-1);
          submitChanges(i);
        }}
      >
        <FaCheck />
      </button>
    </div>
  </h1>
</div>

              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl text-gray-300 hover:text-orange-400"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData({ user: items.user, orderCreatedAt: items.createdAt });
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <h2 className="text-gray-300">No orders found.</h2>
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
