//getting all users 

import axiosInstance from "../../../utils/axiosInstance";



type FetchStudentsParams = {

  page?: number;
  limit?: number;
  search?: string;
  catagory?: string;
  isBlock?: boolean;
};

export const fetchStudents = async ({

  page = 1,
  limit = 10,
  search,
  catagory,
  isBlock,
  }:FetchStudentsParams = {}) => {
    const params: any = {
      page,
      limit,
    };

    if (search) params.search = search;
    if (catagory) params.catagory = catagory;
    if (isBlock !== undefined) params.isBlock = isBlock;

    const response = await axiosInstance.get("http://localhost:5000/api/user/allUsers", {params});
    // console.log(response.data)
    return response.data?.users || []; 
}

export const fetchCourses = async () =>{
  const response = await axiosInstance.get("http://localhost:5005/api/courses")
  console.log("adminfetchcourse", response.data.data);
  return response.data.data;
}

export const fetchAdminDashboard = async ({
    
} = {}) => {
  const response = await axiosInstance.get("http://localhost:5006/api/admin/adminDashboard");
  console.log(response.data)
  return response.data
}


interface NotificationPayload {
  title: string;
  message: string;
  type: string;
  targetType: string;
  targetAgeGroup?: string;
  recipientId?: string;
}

export const sendNotification = async (notificationData: NotificationPayload) => {
  console.log("notificaiton data from service : ", notificationData)
  const response = await axiosInstance.post("http://localhost:5008/api/notification/send", notificationData);
  console.log(response.data)
  return response.data
}

export const getCurentAdmin = async () => {
  const response = await axiosInstance.get("http://localhost:5000/api/user/getuserbyid");
  console.log(response.data)
  return response.data
} 

export const deleteuser = async (userId: String) => {
  console.log("deleteuser:", userId)
  const response = await axiosInstance.post("http://localhost:5000/api/user/delete-user", userId)
  console.log(response.data)
  return response.data
}
