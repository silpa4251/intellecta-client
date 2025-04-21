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




interface NotificationPayload {
  title: string;
  message: string;
  type: string;
  targetType: string;
  targetAgeGroup?: string;
  recipientId?: string;
}

export const sendNotification = async (notificationData: NotificationPayload) => {
  const response = await axiosInstance.post("http://localhost:5008/api/notification/send", notificationData);
  console.log(response.data)
  return response.data
}
