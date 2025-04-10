import React, { useState } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import student from "../assets/Profile.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { userEndPoints } from "../api/endPoints/userEndPoints";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SpinningLoader from "../components/Loaders/SpinningLoader";

const fetchUser = async () => {
  const { data } = await axiosInstance.get(userEndPoints.USER.GET_PROFILE);
  return data.data.user; 
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    profilePic: student, // Default image
  });

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  // Update profile state when user data is fetched
  React.useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        phone: user.phone || "",
        profilePic: user.profilePic ||  student, // Adjust base URL as needed
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#081a37]">
        <SpinningLoader />
      </div>
    );
  }
  if (isError) return <p>Error loading profile</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: name === "age" ? Number(value) || "" : value,
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post(
        userEndPoints.USER.UPLOAD_PROFILE, // Assuming this endpoint handles image upload; adjust if separate
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePic: response.data.data || student,
      }));
      queryClient.invalidateQueries({queryKey: ["user"]}); // Update the user data in the cache
      console.log("img response", response.data.data);
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(userEndPoints.USER.EDIT_PROFILE, {
        name: profile.name,
        email: profile.email,
        phone: profile.phone, // API expects 'phone' based on response
        age: profile.age,
        profilePic: profile.profilePic,
      });
      console.log("Updated Profile:", response.data);
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#081a37] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-xl bg-[#081a37] border border-white shadow-[10px_10px_10px_rgba(0,0,0,0.3)] rounded-3xl p-6"
      >
        <div className="flex justify-center w-full relative">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <label className="absolute ml-16 mt-16 bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-400">
            <FaCamera className="text-gray-600 text-sm" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
          <p className="text-gray-200 mb-2">{profile.email}</p>
          <span className="bg-green-100 text-green-600 px-4 py-1 text-sm rounded-full">
            Active
          </span>
        </div>

        {/* Editable Details */}
        <div className="mt-6 space-y-6">
          {/* Name */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">Name :</span>
            <div className="flex items-center space-x-4 w-2/3">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full py-2 px-2 border border-gray-300 rounded-lg text-white"
              />
              <FaEdit className="text-gray-200 cursor-pointer" />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">Email :</span>
            <div className="flex items-center space-x-4 w-2/3">
              <input
                type="text"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full py-2 px-2 border border-gray-300 rounded-lg text-white"
              />
              <FaEdit className="text-gray-200 cursor-pointer" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">Phone :</span>
            <div className="flex items-center space-x-4 w-2/3">
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full py-2 px-2 border border-gray-300 rounded-lg text-white"
              />
              <FaEdit className="text-gray-200 cursor-pointer" />
            </div>
          </div>

          {/* Age */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">Age :</span>
            <div className="flex items-center space-x-4 w-2/3">
              <input
                type="text"
                name="age"
                value={profile.age || 0 }
                onChange={handleChange}
                className="w-full py-2 px-2 border border-gray-300 rounded-lg text-white"
              />
              <FaEdit className="text-gray-200 cursor-pointer" />
            </div>
          </div>

          {/* Achievements */}
          <div>
            <span className="font-semibold text-white">Achievements :</span>
            <div className="mt-2 flex space-x-4 text-lg">🏅 🎖️</div>
          </div>
        </div> 

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-200 font-semibold text-red-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 font-semibold text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;