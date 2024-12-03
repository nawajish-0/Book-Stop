import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-order-history`,
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!OrderHistory && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-gray-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-gray-400 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No Orders"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-gray-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-400 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-gray-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[5%]">
              <h1>Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[40%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="text-left">Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[30%] md:w-[20%]">
              <h1>Placed On</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div key={items._id} className="bg-gray-800 text-left rounded py-2 px-4 flex justify-start gap-2 hover:bg-gray-700 hover:cursor-pointer transition-all duration-300">
              <div className="w-[5%]">
                <h1>{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[40%] hidden md:block">
                <h1>{items.book.desc.slice(0, 40)}...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>₹ {items.book.price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  {items.status === "Order Placed" ? (
                    <span className="text-green-500">{items.status}</span>
                  ) : items.status === "Canceled" ? (
                    <span className="text-red-500">{items.status}</span>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-[30%] md:w-[20%]">
                <h1 className="text-sm">{new Date(items.createdAt).toLocaleString()}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;