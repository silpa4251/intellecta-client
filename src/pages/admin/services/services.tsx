//getting all users 


import axiosInstance from "../../../utils/axiosInstance";


export const fetchStudents = async ({

  } = {}) => {
    const response = await axiosInstance.get("http://localhost:5006/api/admin/users");
    // console.log(response.data)
    return response.data.data
}


export const fetchAdminDashboard = async ({
    
} = {}) => {
  const response = await axiosInstance.get("http://localhost:5006/api/admin/adminDashboard");
  console.log(response.data)
  return response.data
}
