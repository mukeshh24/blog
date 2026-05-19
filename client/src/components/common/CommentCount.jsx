import useFetch from "@/hooks/useFetch";
import Loading from "./Loading";

const CommentCount = ({ blogId }) => {
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/comment/get-count/${blogId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (loading) {
    return <Loading />;
  }

  return <span className="text-sm">{data?.commentCount}</span>;
};

export default CommentCount;
