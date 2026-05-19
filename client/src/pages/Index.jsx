import BlogCard from "@/components/common/BlogCard";
import Loading from "@/components/common/Loading";
import useFetch from "@/hooks/useFetch";

const Index = () => {
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-all`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      {data && data?.blog && data?.blog.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.blog.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center border rounded-2xl bg-muted/20">
          <h2 className="text-2xl font-bold mb-2">Blogs Not Found</h2>
          <p className="text-muted-foreground text-sm">
            No blog posts are available right now.
          </p>
        </div>
      )}
    </section>
  );
};

export default Index;
