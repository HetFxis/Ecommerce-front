import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../service/Axiosconfig";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userid, token, IsAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get(`user/profile/${userid}/`);
        setProfile(response.data);
        setFormData(response.data);
        setLoading(false);  
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, userid]);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`user/profile/${userid}/`, formData);
      setProfile(response.data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axiosInstance.delete(`user/profile/${userid}/`);
        localStorage.clear();
         ("/register");
        toast.success("Account deleted successfully!");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Failed to delete profile. Please try again.");
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Please Login...</div>;
  if (error) return <div className="flex justify-center items-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {!isEditing ? (
          <div className="flex flex-col items-center">
           
            <img
              className="w-24 h-24 rounded-full "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkuHGQcoh2XCa6j_kBji17CIrfC0YMdzKaeyH7nVWmLTK91zTcEeisGgAl_YEZnItoioE&usqp=CAU"
              alt="User Avatar"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{formData.username}</h2>
            <p className="text-gray-500 text-lg">{formData.email}</p>
            <p className="text-gray-500 text-lg">📞 {formData.mobile_number}</p>

            <button
              onClick={toggleEdit}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Edit Profile
            </button>

          
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Update Password"
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={toggleEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Account
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
