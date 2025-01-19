import React, { useState, useEffect } from 'react';

import "tailwindcss/tailwind.css";
import useProfileData from '../../../hooks/useProfileData';

const OrganizerProfile = () => {
  const [userInfo, isPending] = useProfileData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        image: userInfo.image || 'https://via.placeholder.com/150',
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    // Logic to update user info can be added here if necessary
    setIsModalOpen(false);
  };

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md text-center p-6">
        <img
          src={formData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto shadow-md border-4 border-sky-500"
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{formData.name}</h2>
        <p className="text-gray-600">{formData.email}</p>
        <p className="text-gray-600">{formData.phone}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-6 py-2 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 focus:outline-none"
        >
          Update
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Profile</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </form>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerProfile;
