import React, { useEffect, useState } from 'react';
import { Api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { cleanLocalStorage, getLocalStorageItem, informativeToast } from '../helper/helper';
import { jwtDecode } from 'jwt-decode';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const userToken = getLocalStorageItem('token');

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', description);
    formData.append('username', username);
    formData.append('visibility', "public");
    if (image) {
      formData.append('image', image);
    }

    Api.addBlog(formData).then((res)=>{
        console.log(res.data)
        navigate('/blogs')
    })

  };

  useEffect(() => {
    if (userToken) {
      const details = jwtDecode(userToken);
      const currentTime = Date.now() / 1000;

      if (details.exp && details.exp < currentTime) {
        cleanLocalStorage();
        setTimeout(() => {
          informativeToast("Login session expired.")
          navigate('/')
        }, 2000)
      } else {
        setUsername(details?.username)
      }
    }
  }, [userToken]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter blog title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border resize-none rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter blog description"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-purple-300"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
