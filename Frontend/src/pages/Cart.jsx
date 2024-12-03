import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-cart`,
          { headers }
        );
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        alert("Failed to fetch cart. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchCart();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
      setCart((prevCart) => prevCart.filter(item => item._id !== bookid)); // Remove item from cart locally
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      const total = Cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    }
  }, [Cart]);

  const createOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/create-order`,
        { amount: Total * 100 }
      );
      const data = res.data;

      const paymentData = {
        key: import.meta.env.REACT_APP_RAZORPAY_API_KEY,
        order_id: data.id,
        currency: "INR",
        name: "BookSpot", // your business name
        description: "Book Purchase",
        image: "https://i.pinimg.com/564x/11/53/18/115318a03dd409f995b46ac90d7cd75d.jpg",
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/verify-order`,
              {
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.isOk) {
              await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/place-order`,
                { order: Cart },
                { headers }
              );
              alert("Payment Successful");
              navigate("/profile/orderHistory"); // Redirect on success
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 px-12 h-screen py-8">
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && Cart.length === 0 && (
        <div className="h-full flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-400">
            Empty Cart
          </h1>
          <img
            src="/empty-cart.png"
            alt="empty cart"
            className="lg:h-[50vh] mt-4"
          />
        </div>
      )}
      {!loading && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-gray-300 mb-8">
            Your Cart
          </h1>
          {Cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-gray-800 justify-between items-center shadow-md transition-transform transform hover:scale-105"
              key={i}
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover rounded"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-gray-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-gray-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-gray-300 mt-2 hidden md:block lg:hidden">
                  {item.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-gray-300 mt-2 block md:hidden">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-gray-100 text-3xl font-semibold flex">
                  ₹ {item.price}
                </h2>
                <button
                  className="bg-red-500 text-white rounded p-2 transition-all duration-300 hover:bg-red-700 flex items-center"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-gray-800 rounded shadow-lg">
              <h1 className="text-3xl text-gray-200 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-gray-200">
                <h2>{Cart.length} books</h2>
                <h2>₹ {Total}</h2>
              </div>
              <div className="w-full mt-3">
                <button
                  className="bg-blue-600 text-white rounded px-4 py-2 flex justify-center w-full font-bold hover:bg-blue-700 transition-all duration-300"
                  onClick={createOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
