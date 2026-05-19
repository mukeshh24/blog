import apiInstance from "@/api/apiInstance";

const likeAdd = async (payload) => {
  const response = await apiInstance.post("/like/add", payload);
  return response.data;
};

export { likeAdd };
