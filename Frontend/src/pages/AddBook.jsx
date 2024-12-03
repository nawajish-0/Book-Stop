import { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
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
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/add-book`,
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
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-900">
      <h1 className="text-3xl md:text-5xl font-semibold text-gray-300 mb-8">
        Add Book
      </h1>
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <div>
          <label htmlFor="url" className="text-gray-400">
            Image URL
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-gray-700 text-gray-100 p-3 outline-none rounded transition-all duration-300 focus:ring focus:ring-blue-500"
            placeholder="URL of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="text-gray-400">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-gray-700 text-gray-100 p-3 outline-none rounded transition-all duration-300 focus:ring focus:ring-blue-500"
            placeholder="Title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="author" className="text-gray-400">
            Author of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-gray-700 text-gray-100 p-3 outline-none rounded transition-all duration-300 focus:ring focus:ring-blue-500"
            placeholder="Author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-1/2">
            <label htmlFor="language" className="text-gray-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-700 text-gray-100 p-3 outline-none rounded transition-all duration-300 focus:ring focus:ring-blue-500"
              placeholder="Language of book"
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
              className="w-full mt-2 bg-gray-700 text-gray-100 p-3 outline-none rounded transition-all duration-300 focus:ring focus:ring-blue-500"
              placeholder="Price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="desc" className="text-gray-400">
            Description of Book
          </label>
          <textarea
            className="w-full mt-2 bg-gray-700 text-gray-100 p-3 outline-none rounded transition-all duration-300 focus:ring focus:ring-blue-500"
            rows={5}
            placeholder="Description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
