import apiInstance from "@/api/apiInstance";

const userRegister = async (payload) => {
  const response = await apiInstance.post("/register", payload);
  return response.data;
};

const userLogin = async (payload) => {
  const response = await apiInstance.post("/login", payload);
  return response.data;
};

const userGoogleLogin = async (payload) => {
  const response = await apiInstance.post("/google-login", payload);
  return response.data;
};

const userLogout = async () => {
  const response = await apiInstance.get("/logout");
  return response.data;
};

const userUpdate = async (userId, payload) => {
  const response = await apiInstance.put(`/user-update/${userId}`, payload);
  return response.data;
};

const allUser = async () => {
  const response = await apiInstance.get("/all-user");
  return response.data;
};

const userDelete = async (userId) => {
  const response = await apiInstance.delete(`/user/${userId}`);
  return response.data;
};

export {
  userRegister,
  userLogin,
  userGoogleLogin,
  userLogout,
  userUpdate,
  allUser,
  userDelete,
};
