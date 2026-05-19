import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BlogAddRoute, BlogEditRoute } from "@/routes/Route";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/common/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import errorHandler from "@/lib/errorHandler";
import { blogDelete } from "@/services/blogServices";

const Blog = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/show`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData],
  );

  const handleDelete = async (blogId) => {
    try {
      const response = await blogDelete(blogId);

      if (response?.success) {
        setRefreshData(!refreshData);
        toast.success(response.message);
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
    <section>
      <Card>
        <CardHeader>
          <Link
            to={BlogAddRoute}
            className="rounded-lg text-base font-medium h-11 bg-black/80 hover:bg-black transition-all duration-300 cursor-pointer max-w-max px-4 flex items-center gap-2 text-white"
          >
            <Plus className="w-5 h-5" />
            <span>Add Blog</span>
          </Link>
        </CardHeader>
        <CardContent className="mt-4">
          <Table>
            <TableCaption>
              A list of all blogs published on your platform.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">#</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data?.blog?.length > 0 ? (
                data.blog.map((blog, index) => (
                  <TableRow key={blog._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{blog.author?.name}</TableCell>
                    <TableCell>{blog.category?.name}</TableCell>
                    <TableCell className="max-w-40 truncate">
                      {blog.title}
                    </TableCell>
                    <TableCell className="max-w-40 truncate">
                      <span className="bg-muted px-2 py-1 rounded-md text-sm">
                        {blog.slug}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button variant="outline" size="sm">
                          <Link to={BlogEditRoute(blog._id)}>
                            <Pencil />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the blog.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(blog._id)}
                                className="bg-red-500 hover:bg-red-600 cursor-pointer"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No blogs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default Blog;
