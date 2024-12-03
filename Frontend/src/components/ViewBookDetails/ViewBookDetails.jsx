import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/add-book-to-favourite`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/add-to-cart`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/delete-book`,
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };

  return (
    <>
      {Data ? (
        <div className="px-4 md:px-12 py-8 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6">
            <div className="bg-gray-900 p-8 flex flex-col lg:flex-row justify-around rounded-lg shadow-lg">
              <img
                src={Data.url}
                alt={Data.title}
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-md transition-transform transform hover:scale-105"
              />
              {isLoggedIn && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  {role === "user" ? (
                    <>
                      <button
                        className="bg-white rounded-full text-red-500 text-2xl p-2 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                        onClick={handleFavourite}
                      >
                        <FaHeart />
                        <span className="ms-2 hidden lg:block">Favourites</span>
                      </button>
                      <button
                        className="bg-blue-500 rounded-full text-white text-2xl p-2 mt-4 md:mt-0 lg:mt-4 flex items-center justify-center hover:bg-blue-700 transition-all duration-300"
                        onClick={handleCart}
                      >
                        <FaShoppingCart />
                        <span className="ms-2 hidden lg:block">Add to Cart</span>
                      </button>
                    </>
                  ) : role === "admin" ? (
                    <>
                      <Link
                        to={`/UpdateBook/${id}`}
                        className="bg-white rounded-full text-black text-2xl p-2 flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                      >
                        <FaEdit />
                        <span className="ms-2 hidden lg:block">Edit</span>
                      </Link>
                      <button
                        className="bg-white text-red-500 rounded-full text-2xl p-2 mt-4 md:mt-0 lg:mt-4 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                        onClick={deleteBook}
                      >
                        <MdDeleteOutline />
                        <span className="ms-2 hidden lg:block">Delete Book</span>
                      </button>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-gray-100 font-semibold">{Data.title}</h1>
            <p className="text-gray-400 mt-1">by {Data.author}</p>
            <p className="text-gray-300 mt-4 text-lg">{Data.desc}</p>
            <p className="flex text-gray-400 mt-4 items-center">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="text-gray-100 mt-4 text-3xl font-semibold">
              Price: ₹ {Data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-gray-400 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
