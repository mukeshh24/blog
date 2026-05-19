import apiInstance from "@/api/apiInstance";

const blogAdd = async (payload) => {
  const response = await apiInstance.post("/blog/add", payload);
  return response.data;
};

const blogEdit = async (blogId, payload) => {
  const response = await apiInstance.put(`/blog/edit/${blogId}`, payload);
  return response.data;
};

const blogDelete = async (blogId) => {
  const response = await apiInstance.delete(`/blog/delete/${blogId}`);
  return response.data;
};

const blogShow = async () => {
  const response = await apiInstance.get("/blog/show");
  return response.data;
};

export { blogAdd, blogEdit, blogDelete, blogShow };
