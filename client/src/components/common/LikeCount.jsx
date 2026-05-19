import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import errorHandler from "@/lib/errorHandler";
import { likeAdd } from "@/services/likeServices";

const LikeCount = ({ blogId }) => {
  const [likeCount, setLikeCount] = useState(0);

  const auth = useSelector((state) => state.auth);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/like/get-like/${blogId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  useEffect(() => {
    if (data) {
      setLikeCount(data?.like);
    }
  }, [data, setLikeCount]);

  const handleLikeHandle = async () => {
    try {
      if (!auth.isLoggedIn) {
        return toast.error("Please login to like a blog.");
      }

      const payload = {
        author: auth?.user?._id,
        blogId: blogId,
      };

      const response = await likeAdd(payload);

      if (response?.success) {
        toast.success(response.message);
        setLikeCount(response?.like);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <button
      onClick={handleLikeHandle}
      className="flex items-center gap-1 hover:text-black transition-all cursor-pointer"
    >
      <Heart
        className="w-5 h-5"
        fill={likeCount > 0 ? "red" : "none"}
        color={likeCount > 0 ? "red" : "currentColor"}
      />
      <span className="text-sm">{likeCount}</span>
    </button>
  );
};

export default LikeCount;
