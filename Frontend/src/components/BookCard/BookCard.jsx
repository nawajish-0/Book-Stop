import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/remove-book-from-favourite`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing book from favourites:", error);
      alert("An error occurred while removing the book from favourites.");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105 shadow-lg">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-gray-900 flex items-center justify-center rounded-md overflow-hidden">
          <img
            src={data.url}
            alt={`${data.title} cover`}
            className="h-[25vh] w-auto rounded-md transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h2 className="mt-4 text-2xl text-gray-100 font-semibold">{data.title}</h2>
        <p className="mt-1 text-gray-400 font-medium">by {data.author}</p>
        <p className="mt-2 text-gray-200 font-semibold text-lg">₹ {data.price}</p>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md border border-yellow-500 mt-4 transition-all duration-300"
          onClick={handleRemoveBook}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
