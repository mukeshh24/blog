import { Calendar, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/common/Loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import moment from "moment/moment";
import { decode } from "entities";
import DOMPurify from "dompurify";
import Comment from "@/components/common/Comment";
import CommentCount from "@/components/common/CommentCount";
import LikeCount from "@/components/common/LikeCount";

const BlogDetails = () => {
  const { slug } = useParams();

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/show/slug-blog/${slug}`,
    {
      method: "GET",
      credentials: "include",
    },
    [slug],
  );

  if (loading) {
    return <Loading />;
  }

  const blog = data?.blog;

  if (!blog) {
    return (
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <div className="border rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Blog Not Found</h2>
            <p className="text-muted-foreground">
              The blog you are looking for does not exist.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr] gap-8">
          <div className="border rounded-2xl p-6 bg-white">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-6">
              {blog?.title}
            </h1>
            <div className="flex items-center justify-between flex-wrap gap-4 border-b pb-5 mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={
                      blog?.author?.avatar || "https://github.com/shadcn.png"
                    }
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-sm capitalize">
                    {blog?.author?.name}
                  </h4>
                  <p className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{moment(blog?.createdAt).format("DD-MM-YYYY")}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-gray-500">
                <LikeCount blogId={blog?._id} />
                <button className="flex items-center gap-1 hover:text-black transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <CommentCount blogId={blog?._id} />
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl mb-8">
              <img
                src={blog?.featureImage}
                alt={blog?.title}
                className="w-full h-100 object-cover"
              />
            </div>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(decode(blog?.content)),
              }}
            />
            <Comment blogId={blog?._id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
