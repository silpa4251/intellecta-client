import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import student from "../assets/Jerry Hardy.jpg";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "Jerry Hardy",
    email: "jerry2010@gmail.com",
    dob: "2015-09-11",
    age: 10,
    profilePic: student, // Default image
  });

  const handleChange = (field: string, value: string | number) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full max-w-3xl bg-white shadow-lg rounded-2xl p-4">
          <div className="flex justify-center w-full">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>

        {/* Profile Info */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500 mb-2">{profile.email}</p>
          <span className="bg-green-100 text-green-600 px-4 py-1 text-sm rounded-full">
            Active
          </span>
        </div>

        {/* Editable Details */}
        <div className="mt-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Profile</span>
            <div className="flex items-center space-x-2">
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <button className="px-4 py-2 text-sm bg-blue-500 font-semibold text-white rounded-lg">
                Update
              </button>
              <button className="px-4 py-2 text-sm bg-red-500 font-semibold text-white rounded-lg">
                Remove
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Email</span>
            <div className="flex items-center space-x-4">
              <span>{profile.email}</span>
              <FaEdit
                className="text-gray-500 cursor-pointer"
                onClick={() => handleChange("email", "newemail@gmail.com")}
              />
            </div>
          </div>

          {/* DOB */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">DOB</span>
            <div className="flex items-center space-x-4">
              <span>{profile.dob}</span>
              <FaEdit
                className="text-gray-500 cursor-pointer"
                onClick={() => handleChange("dob", "2014-08-12")}
              />
            </div>
          </div>

          {/* Age */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Age</span>
            <div className="flex items-center space-x-4">
              <span>{profile.age}</span>
              <FaEdit
                className="text-gray-500 cursor-pointer"
                onClick={() => handleChange("age", profile.age + 1)}
              />
            </div>
          </div>

          {/* Achievements */}
          <div>
            <span className="font-semibold">Achievements</span>
            <div className="mt-2 flex space-x-4 text-lg">
              🏅 🎖️
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-red-200 font-semibold text-red-700 rounded-lg">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 font-semibold text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
