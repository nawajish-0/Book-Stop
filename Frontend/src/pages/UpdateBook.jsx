import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/update-book`,
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        alert("Failed to fetch book details.");
      }
    };
    fetch();
  }, [id]);

  return (
    <div className="bg-gray-900 h-full p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-gray-200 mb-8">
        Update Book
      </h1>
      <div className="p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="url" className="text-gray-400">
            Image URL
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="text-gray-400">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="text-gray-400">
            Author of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author's name"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="language" className="text-gray-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter language"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="price" className="text-gray-400">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="text-gray-400">
            Description of Book
          </label>
          <textarea
            className="w-full mt-2 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Enter book description"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
