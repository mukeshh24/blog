import apiInstance from "@/api/apiInstance";

const categoryAdd = async (payload) => {
  const response = await apiInstance.post("/category/add", payload);
  return response.data;
};

const categoryEdit = async (categoryId, payload) => {
  const response = await apiInstance.put(
    `/category/edit/${categoryId}`,
    payload,
  );
  return response.data;
};

const categoryDelete = async (categoryId) => {
  const response = await apiInstance.delete(`/category/delete/${categoryId}`);
  return response.data;
};

const categoryShow = async () => {
  const response = await apiInstance.get("/category/show");
  return response.data;
};

export { categoryAdd, categoryEdit, categoryDelete, categoryShow };
