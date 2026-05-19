import apiInstance from "@/api/apiInstance";

const commentAdd = async (payload) => {
  const response = await apiInstance.post("/comment/add", payload);
  return response.data;
};

const commentDelete = async (commentId) => {
  const response = await apiInstance.delete(`/comment/delete/${commentId}`);
  return response.data;
};

export { commentAdd, commentDelete };
