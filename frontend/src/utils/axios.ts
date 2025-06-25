import axios from "axios";
import { SignInUserType } from "@/types";
import { toast } from "react-toastify";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper function to get the current token dynamically
const getAuthToken = () => {
  return localStorage.getItem('freelancingPlatformAuthToken');
};

// Helper function to get auth headers
const getAuthHeaders = (isMultipart = false) => {
  const token = getAuthToken();
  const headers: any = {
    Authorization: `Bearer ${token}`,
  };
  
  if (isMultipart) {
    headers["Content-Type"] = "multipart/form-data";
  }
  
  return headers;
};

// Regular email/password sign in

export const signIn = async (data: SignInUserType) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, data);
    return response;
  } catch (error) {
    toast.error("Login Failed");
  }
}

// Google authentication
export const googleSignIn = async (idToken: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/google-auth`, { idToken });
    
    // Store the token (Firebase ID token) in localStorage
    if (response.data.token) {
      localStorage.setItem('freelancingPlatformAuthToken', response.data.token);
    }
    
    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.error || "Google sign in failed");
    throw error;
  }
}

export const sendMessage = async (formData: FormData) => {
  try {
    await axios.post(`${apiUrl}/messages/send`, formData, {
      headers: getAuthHeaders(true),
    });  
  } catch (error: any) { 
    toast.error(error?.response?.data?.message || "Failed to send message");
  }
}

export const getMessage = async (senderId: string, receiverId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/messages/${senderId}/${receiverId}`, {
      headers: getAuthHeaders(),
    });  
    return response.data.messages;
  } catch (error: any) { 
    console.log(error);
    toast.error(error?.response?.data?.message || "Failed to get messages");
  }
}

export const newMsgInit = async (senderId: string, receiverId: string) => {
  try {
    const response = await axios.post(`${apiUrl}/messages/newMessageInit/${senderId}/${receiverId}`, {}, {
      headers: getAuthHeaders(),
    });  
    return response.data.newMessages;
  } catch (error: any) { 
    toast.error(error?.response?.data?.message || "Failed to initialize new message");
  }
}

export const createServer = async (formData: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/servers/create`, formData, {
      headers: getAuthHeaders(true),
    });
    return response;
  } catch (error) {
    console.log("Upload Failed", error);
    throw new Error("Upload Failed");
  }
}

export const getAllServer = async (userId: string) => { 
  try {
    const response = await axios.get(`${apiUrl}/servers/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data.servers;
  } catch (error) { 
    console.log(error);
    // throw new Error("Error");
  }
}

export const addMessageRequest = async (requester: string, recipient: string) => { 
  const data = {requester, recipient};
  // console.log("data", data);
  try {
    const response = await axios.post(`${apiUrl}/friendRequests/send`, data, {
      headers: getAuthHeaders(),
    });
    toast.success(response.data.message);
    return response.data.success;
  } catch (error: any) { 
    toast.error(error?.response?.data?.message || "Failed to send friend request");
  }
}

export const getFriendRequest = async (userId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/friendRequests/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data.friendRequests;
  } catch (error) { 
    console.error("Error", error);
    throw new Error("Error");
  }
}

export const deleteServer = async (serverId: string) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem('freelancingPlatformAuthToken') : null;
    const response = await axios.delete(`${apiUrl}/servers/${serverId}`, {
      headers: getAuthHeaders(),
    });
    console.log("response", response.data);
    return response.data.requests;
  } catch (error) { 
    console.error("Error", error);
    throw new Error("Error");
  }
}

export const requestAccept = async (requestId: string) => { 
  try {
    const response = await axios.put(`${apiUrl}/friendRequests/respond/${requestId}`, 
      {status: 'accepted'}, {
        headers: getAuthHeaders(),
      });
    toast.success(response.data.message);
    return response.data.friendRequests;
  } catch (error) { 
    console.error("Error", error);
    throw new Error("Error");
  }
}

export const requestCancel = async (requestId: string) => { 
  try {
    const response = await axios.put(`${apiUrl}/friendRequests/respond/${requestId}`, 
      {status: 'cancel'}, {
        headers: getAuthHeaders(),
      });
    toast.success(response.data.message);
  } catch (error) { 
    console.error("Error", error);
    throw new Error("Error");
  }
}

export const getDM = async (uid: string) => {
  try {
    const response = await axios.get(`${apiUrl}/friendRequests/friendList/${uid}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
    toast.error(error?.response?.data?.message || "Failed to get DM list");
    throw error;
  }
}